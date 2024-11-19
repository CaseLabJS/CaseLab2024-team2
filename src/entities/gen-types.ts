import axios from 'axios';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const apiUrl = 'http://172.18.27.102:8080/v3/api-docs';
const outputDir = path.join(__dirname, '');

async function ensureDirectoryExists(directory: string): Promise<void> {
  const lowerCaseDir = directory.toLowerCase(); // Преобразуем к нижнему регистру
  if (!fs.existsSync(lowerCaseDir)) {
    await fs.promises.mkdir(lowerCaseDir, { recursive: true });
    console.log(`Создана директория для схем: ${lowerCaseDir}`);
  }
}

interface SchemaProperty {
  type: string;
  description?: string;
  items?: SchemaProperty;
  title?: string;
  $ref?: string;
}

interface Schema {
  properties: Record<string, SchemaProperty>;
  required?: string[];
  $ref?: string;
}

interface ValueData {
  [key: string]: { place: string; nameRef: string }[];
}

interface ApiResponse {
  components: {
    schemas: Record<string, Schema>;
  };
}

const pathToSharedTypes = path.join(__dirname, '..', 'shared', 'types');

async function generateSchemas(): Promise<void> {
  try {
    console.log('Получение схем из API...');
    const response = await axios.get<ApiResponse>(apiUrl);
    const schemas: Record<string, Schema> = response.data.components.schemas;
    console.log('Получено схем:', Object.keys(schemas).length);

    const groupedSchemas: Record<string, { name: string; schema: Schema }[]> = {};

    for (const [name, schema] of Object.entries(schemas)) {
      console.log(`Обрабатываем схему: ${name}`);

      if (name === 'ProblemDetail') {
        const interfaceContent = generateInterface(name, schema, {}, []);
        const filePath = path.join(pathToSharedTypes, `${name}.ts`);
        await fs.promises.writeFile(filePath, interfaceContent, 'utf8');
        console.log(`Создан файл: ${filePath}`);
        continue;
      }

      let groupName = name.split(/(?=[A-Z])/)[0].toLowerCase(); // Переводим groupName в нижний регистр
      if (
        ['authentication', 'register', 'authenticationrequest', 'registerrequest', 'authenticationresponse'].includes(
          name.toLowerCase(),
        )
      ) {
        groupName = 'user';
      }

      if (
        name.toLowerCase().startsWith('create') ||
        name.toLowerCase().startsWith('update') ||
        name.toLowerCase().startsWith('patch') ||
        name.toLowerCase().startsWith('document')
      ) {
        groupName = 'documents';
      }

      if (name.toLowerCase().startsWith('voting')) {
        groupName = 'vote';
      }

      groupedSchemas[groupName] = groupedSchemas[groupName] || [];
      groupedSchemas[groupName].push({ name, schema });
    }

    const nestedSchemas: Record<string, { place: string; nameRef: string }[]> = {};

    for (const [groupName, interfaces] of Object.entries(groupedSchemas)) {
      const groupDir = path.join(outputDir, groupName.toLowerCase(), 'model', 'types'); // Путь к папке в нижнем регистре
      await ensureDirectoryExists(groupDir);

      const importFilePath: string = path.join(outputDir, groupName.toLowerCase(), 'index.ts'); // Путь к файлу импорта в нижнем регистре
      const importStatements: string[] = [];

      for (const { name, schema } of interfaces) {
        const interfaceImportStatements: string[] = [];
        const interfaceContent = generateInterface(name, schema, nestedSchemas, interfaceImportStatements);

        const nameLow = name[0].toLowerCase() + name.slice(1);

        const filePath = path.join(groupDir, `${nameLow}.type.ts`);
        const dirPath = path.posix.dirname(filePath);

        await ensureDirectoryExists(dirPath); // Создаем директорию в нижнем регистре

        fs.writeFileSync(filePath, interfaceContent, 'utf8');
        console.log(`Создан файл: ${filePath}`);

        importStatements.push(
          `export type * from '@/entities/${groupName.toLowerCase()}/model/types/${nameLow}.type';`,
        );

        if (schema.properties) {
          for (const [, value] of Object.entries(schema.properties)) {
            const refType = value.items?.$ref
              ? value.items.$ref.split('/').pop()
              : value.$ref
                ? value.$ref.split('/').pop()
                : undefined;

            if (refType) {
              const firstWord = refType.split(/(?=[A-Z])/)[0].toLowerCase();
              const refTypeLow = refType[0].toLowerCase() + refType.slice(1);
              let firstWordChenged;
              if (firstWord === 'document') {
                firstWordChenged = firstWord + 's';
              } else {
                firstWordChenged = firstWord;
              }
              const relativePath = path
                .join(firstWordChenged, 'model', 'types', `${refTypeLow}.type.ts`)
                .replace(/\\/g, '/');
              const refNameLow = name[0].toLowerCase() + name.slice(1);
              const key = `${groupName.toLowerCase()}/model/types/${refNameLow}`;

              console.log(`Добавляем вложенный тип: ${key} -> ${relativePath}`);

              nestedSchemas[key] = nestedSchemas[key] || [];
              nestedSchemas[key].push({ place: relativePath, nameRef: refType });
            }
          }
        }
      }

      fs.writeFileSync(importFilePath, importStatements.join('\n'), 'utf8');
      console.log(`Создан файл импорта: ${importFilePath}`);
    }

    const valueFilePath = path.join(outputDir, 'value.json');
    let valueData: ValueData | null = {};
    if (fs.existsSync(valueFilePath)) {
      valueData = JSON.parse(await fs.promises.readFile(valueFilePath, 'utf8')) as ValueData;
    }

    for (const parentName in nestedSchemas) {
      for (const { place, nameRef } of nestedSchemas[parentName]) {
        if (valueData[parentName]) {
          const isExisting = valueData[parentName].some((item) => item.place === place && item.nameRef === nameRef);
          if (!isExisting) {
            valueData[parentName].push({ place, nameRef });
          }
        } else {
          valueData[parentName] = [{ place, nameRef }];
        }
      }
    }

    await fs.promises.writeFile(valueFilePath, JSON.stringify(valueData, null, 2), 'utf8');
    console.log(`Типы с вложенными типами успешно сохранены в ${valueFilePath}`);

    for (const parentName in valueData) {
      const parentFilePath = path.join(outputDir, `${parentName.toLowerCase()}.type.ts`);
      if (fs.existsSync(parentFilePath)) {
        let parentFileContent = await fs.promises.readFile(parentFilePath, 'utf8');

        const importStatementsToAdd: string[] = [];
        for (const { place, nameRef } of valueData[parentName]) {
          const importStatement = `import { ${nameRef} } from '@/entities/${place}';\n`;
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

function generateInterface(
  name: string,
  schema: Schema,
  nestedSchemas: Record<string, { place: string; nameRef: string }[]>,
  importStatements: string[] = [],
): string {
  const properties = Object.entries(schema.properties).map(([key, value]: [string, SchemaProperty]) => {
    let type: string;

    // Проверка, если это `VotingProcessRequest`
    if (name === 'VotingProcessRequest' && key === 'deadline') {
      // Используем тип `Deadline` из файла `deadline.type.ts`
      const importStatement = `import { Deadline } from './deadline.type';`;
      type = 'Deadline';

      // Добавляем импорт только если его еще нет в списке importStatements
      if (!importStatements.includes(importStatement)) {
        importStatements.push(importStatement);
      }
    } else if (value.$ref) {
      const refName = value.$ref.split('/').pop()!;
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
      // Если у свойства есть items и $ref, значит, это массив
      type = `${value.items.$ref.split('/').pop()!}[]`;
    } else {
      type = getTypeFromSchemaProperty(value);
    }

    return `\t${key}: ${type};`;
  });

  const importSection = importStatements.length > 0 ? importStatements.join('\n') + '\n' : '';
  const finalImportSection = importStatements.length > 0 ? importSection + '\n' : '';

  return `${finalImportSection}export interface ${name} {\n${properties.join('\n')}\n}`;
}

function getTypeFromSchemaProperty(value: SchemaProperty): string {
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
      return 'Record<string, string | number>';
    default:
      return 'unknown';
  }
}

// Дополнительная функция для обработки элементов массива
function generateTypeForArray(items?: SchemaProperty): string {
  if (!items) return 'unknown';
  if (items.$ref) {
    return items.$ref.split('/').pop()!;
  } else if (items.type) {
    return getTypeFromSchemaProperty(items);
  }
  return 'unknown';
}

async function main(): Promise<void> {
  await ensureDirectoryExists(outputDir);
  await generateSchemas();
}

main().catch((error) => {
  console.error('Ошибка при запуске основного скрипта:', error);
});