import axios from 'axios';
import fs from 'fs';
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const apiUrl = 'http://172.18.27.102:8080/v3/api-docs';
const outputDir = path.join(__dirname, '');
async function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    await fs.promises.mkdir(directory, { recursive: true });
    console.log(`Создана директория для схем: ${directory}`);
  }
}
const pathToSharedTypes = path.join(__dirname, '..', 'shared', 'types');
async function generateSchemas() {
  try {
    console.log('Получение схем из API...');
    const response = await axios.get(apiUrl);
    const schemas = response.data.components.schemas;
    console.log('Получено схем:', Object.keys(schemas).length);
    const groupedSchemas = {};
    for (const [name, schema] of Object.entries(schemas)) {
      console.log(`Обрабатываем схему: ${name}`);
      if (name === 'ProblemDetail') {
        console.log(`Создаем схему: ${name} в ${pathToSharedTypes}`);
        const interfaceContent = generateInterface(name, schema, {}, []);
        const filePath = path.join(pathToSharedTypes, `${name}.ts`);
        await fs.promises.writeFile(filePath, interfaceContent, 'utf8');
        console.log(`Создан файл: ${filePath}`);
        continue;
      }
      let groupName = name.split(/(?=[A-Z])/)[0];
      if (
        ['Authentication', 'Register', 'AuthenticationRequest', 'RegisterRequest', 'AuthenticationResponse'].includes(
          name,
        )
      ) {
        groupName = 'User';
      }
      if (
        name.substring(0, 6).indexOf('Create') >= 0 ||
        name.substring(0, 6).indexOf('Update') >= 0 ||
        name.substring(0, 6).indexOf('Patch') >= 0
      ) {
        groupName = 'Document';
      }
      groupedSchemas[groupName] = groupedSchemas[groupName] || [];
      groupedSchemas[groupName].push({ name, schema });
    }
    const nestedSchemas = {};
    for (const [groupName, interfaces] of Object.entries(groupedSchemas)) {
      const groupDir = path.join(outputDir, groupName, 'model', 'types');
      if (!fs.existsSync(groupDir)) fs.mkdirSync(groupDir, { recursive: true });
      const importFilePath = path.join(outputDir, groupName, 'index.ts');
      const importStatements = [];
      for (const { name, schema } of interfaces) {
        const interfaceImportStatements = [];
        const interfaceContent = generateInterface(name, schema, nestedSchemas, interfaceImportStatements);
        const filePath = path.join(groupDir, `${name}.ts`);
        const dirPath = path.posix.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
          await fs.promises.mkdir(dirPath, { recursive: true });
        }
        fs.writeFileSync(filePath, interfaceContent, 'utf8');
        console.log(`Создан файл: ${filePath}`);
        importStatements.push(`export * from './model/types/${name}';`);
        if (schema.properties) {
          for (const [, value] of Object.entries(schema.properties)) {
            const refType = value.items?.$ref
              ? value.items.$ref.split('/').pop()
              : value.$ref
                ? value.$ref.split('/').pop()
                : undefined;
            if (refType) {
              const firstWord = refType.split(/(?=[A-Z])/)[0];
              const relativePath = path.join(firstWord, 'model', 'types', `${refType}.ts`).replace(/\\/g, '/');
              const key = `${groupName}/model/types/${name}`;
              console.log(`Добавляем вложенный тип: ${key} -> ${relativePath}`);
              // Теперь добавляем вложенные типы в массив
              nestedSchemas[key] = nestedSchemas[key] || [];
              nestedSchemas[key].push({ place: relativePath, nameRef: refType });
            }
          }
        }
      }
      if (typeof importFilePath === 'string' && Array.isArray(importStatements)) {
        fs.writeFileSync(importFilePath, importStatements.join('\n'), 'utf8');
        console.log(`Создан файл импорта: ${importFilePath}`);
      } else {
        console.error('Ошибка: importFilePath должен быть строкой, а importStatements — массивом строк.');
      }
    }
    // Чтение и запись данных в value.json с проверкой существования
    const valueFilePath = path.join(outputDir, 'value.json');
    let valueData = {}; // Используем новый тип ValueData
    if (fs.existsSync(valueFilePath)) {
      valueData = JSON.parse(await fs.promises.readFile(valueFilePath, 'utf8'));
    }
    // Обновляем или добавляем новые записи
    for (const parentName in nestedSchemas) {
      // Получаем все вложенные типы для этого родителя
      for (const { place, nameRef } of nestedSchemas[parentName]) {
        if (valueData[parentName]) {
          // Проверяем, существует ли уже запись с таким же place и nameRef
          const isExisting = valueData[parentName].some((item) => item.place === place && item.nameRef === nameRef);
          if (!isExisting) {
            valueData[parentName].push({ place, nameRef });
          }
        } else {
          valueData[parentName] = [{ place, nameRef }];
        }
      }
    }
    // Записываем обновленные данные в value.json
    await fs.promises.writeFile(valueFilePath, JSON.stringify(valueData, null, 2), 'utf8');
    console.log(`Типы с вложенными типами успешно сохранены в ${valueFilePath}`);
    // Дополнительная проверка добавления импорта в родительские файлы
    for (const parentName in valueData) {
      const parentFilePath = path.join(outputDir, `${parentName}.ts`);
      if (fs.existsSync(parentFilePath)) {
        let parentFileContent = await fs.promises.readFile(parentFilePath, 'utf8');
        // Добавляем импорты для каждого вложенного типа, если их больше одного
        const importStatementsToAdd = [];
        for (const { place, nameRef } of valueData[parentName]) {
          const importStatement = `import { ${nameRef} } from '../../../${place}';\n`;
          if (!parentFileContent.includes(importStatement)) {
            importStatementsToAdd.push(importStatement);
          }
        }
        if (importStatementsToAdd.length > 0) {
          parentFileContent = importStatementsToAdd.join('') + parentFileContent;
          await fs.promises.writeFile(parentFilePath, parentFileContent, 'utf8');
          console.log(`Добавлен импорт в файл: ${parentFilePath}`);
        }
      } else {
        console.warn(`Файл родительского интерфейса не найден: ${parentFilePath}`);
      }
    }
  } catch (error) {
    console.error('Ошибка при получении схем:', error);
  }
}
// Генерация интерфейса с добавлением импортов
function generateInterface(name, schema, nestedSchemas, importStatements = []) {
  const properties = Object.entries(schema.properties).map(([key, value]) => {
    let type;
    if (value.$ref) {
      const refName = value.$ref.split('/').pop();
      type = refName;
      if (nestedSchemas[refName] && Array.isArray(nestedSchemas[refName])) {
        nestedSchemas[refName].forEach(({ place, nameRef }) => {
          const importPath = path.relative(outputDir, path.join(__dirname, place)).replace(/\\/g, '/');
          const importStatement = `import { ${nameRef} } from '${importPath}';`;
          if (!importStatements.includes(importStatement)) {
            importStatements.push(importStatement);
          }
        });
      }
    } else if (value.items && value.items.$ref) {
      type = value.items.$ref.split('/').pop();
    } else {
      type = getTypeFromSchemaProperty(value);
    }
    return `\t${key}: ${type};`;
  });
  const importSection = importStatements.length > 0 ? importStatements.join('\n') + '\n' : '';
  const finalImportSection = importStatements.length > 0 ? importSection + '\n' : '';
  return `${finalImportSection}export interface ${name} {\n${properties.join('\n')}\n}`;
}
function getTypeFromSchemaProperty(value) {
  switch (value.type) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return `${generateTypeForArray(value.items)}[]`;
    case 'object':
      return '{ [key: string]: unknown }';
    default:
      return 'unknown';
  }
}
// Дополнительная функция для обработки элементов массива
function generateTypeForArray(items) {
  if (!items) return 'unknown';
  if (items.$ref) {
    return items.$ref.split('/').pop();
  } else if (items.type) {
    return getTypeFromSchemaProperty(items);
  }
  return 'unknown';
}
async function main() {
  await ensureDirectoryExists(outputDir);
  await generateSchemas();
}
main().catch((error) => {
  console.error('Ошибка при запуске основного скрипта:', error);
});
