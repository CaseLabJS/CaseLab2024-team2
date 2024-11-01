import axios from "axios";
import path from 'path';
import fs from 'fs';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const apiUrl = 'http://172.18.27.102:8080/v3/api-docs';
const outputDir = path.join(__dirname, '');
// Создание директории
async function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        await fs.promises.mkdir(directory, { recursive: true });
        console.log(`Создана директория для схем: ${directory}`);
    }
}
const pathToSharedTypes = path.join(__dirname, '..', 'shared', 'types');
// Генерация файлов по группам
async function generateSchemas() {
    try {
        console.log('Получение схем из API...');
        const response = await axios.get(apiUrl);
        const schemas = response.data.components.schemas;
        console.log('Получено схем:', Object.keys(schemas).length);
        const groupedSchemas = {};
        for (const [name, schema] of Object.entries(schemas)) {
            console.log(`Обрабатываем схему: ${name}`); // Лог для каждого имени схемы
            if (name === 'ProblemDetail') {
                console.log(`Создаем схему: ${name} в ${pathToSharedTypes}`); // Лог для создания схемы ProblemDetail
                const interfaceContent = generateInterface(name, schema, {}, []);
                const filePath = path.join(pathToSharedTypes, `${name}.ts`); // Путь к файлу в shared/types
                await fs.promises.writeFile(filePath, interfaceContent, 'utf8');
                console.log(`Создан файл: ${filePath}`);
                continue; // Пропускаем дальнейшую обработку для этой схемы
            }
            let groupName = name.split(/(?=[A-Z])/)[0];
            if (['Authentication', 'Register', 'AuthenticationRequest', 'RegisterRequest', 'AuthenticationResponse'].includes(name)) {
                groupName = 'User'; // Установим группу "User" для Authentication и Register
            }
            else if (['CreateDocumentRequest', 'UpdateDocumentRequest', 'UpdateDocumentVersionRequest', 'VoteRequest', 'VoteResponse', 'VoteUserResponse', 'VotingProcessRequest', 'VotingProcessResponse'].includes(name)) {
                groupName = 'Document';
            }
            // else {
            //   console.log(`Схема ${name} попадает в группу ${groupName}`); // Лог для других схем
            // }
            groupedSchemas[groupName] = groupedSchemas[groupName] || [];
            groupedSchemas[groupName].push({ name, schema });
        }
        const nestedSchemas = {};
        for (const [groupName, interfaces] of Object.entries(groupedSchemas)) {
            const groupDir = path.join(outputDir, groupName, 'model'); // Создание подпапки model в каждой группе
            if (!fs.existsSync(groupDir))
                fs.mkdirSync(groupDir, { recursive: true });
            const importFilePath = path.join(outputDir, groupName, `index.ts`);
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
                importStatements.push(`export * from './model/${name}';`);
                if (schema.properties) {
                    for (const [, value] of Object.entries(schema.properties)) {
                        const refType = value.items?.$ref
                            ? value.items.$ref.split('/').pop()
                            : value.$ref
                                ? value.$ref.split('/').pop()
                                : undefined;
                        if (refType) {
                            const firstWord = refType.split(/(?=[A-Z])/)[0];
                            const relativePath = path.join(firstWord, 'model', `${refType}.ts`).replace(/\\/g, '/');
                            const key = `${groupName}/model/${name}`;
                            nestedSchemas[key] = { place: relativePath, nameRef: refType };
                        }
                    }
                }
            }
            fs.writeFileSync(importFilePath, importStatements.join('\n'), 'utf8');
            console.log(`Создан файл импорта: ${importFilePath}`);
        }
        const valueFilePath = path.join(outputDir, 'value.json');
        await fs.promises.writeFile(valueFilePath, JSON.stringify(nestedSchemas, null, 2), 'utf8');
        console.log(`Типы с вложенными типами успешно сохранены в ${valueFilePath}`);
        const valueData = JSON.parse(await fs.promises.readFile(valueFilePath, 'utf8'));
        for (const parentName in valueData) {
            const { place, nameRef } = valueData[parentName];
            const parentFilePath = path.join(outputDir, `${parentName}.ts`);
            if (fs.existsSync(parentFilePath)) {
                const parentFileContent = await fs.promises.readFile(parentFilePath, 'utf8');
                const importStatement = `import { ${nameRef} } from '../../${place}';\n`;
                if (!parentFileContent.includes(importStatement)) {
                    const updatedContent = importStatement + parentFileContent;
                    await fs.promises.writeFile(parentFilePath, updatedContent, 'utf8');
                    console.log(`Добавлен импорт в файл: ${parentFilePath}`);
                }
            }
            else {
                console.warn(`Файл родительского интерфейса не найден: ${parentFilePath}`);
            }
        }
    }
    catch (error) {
        console.error('Ошибка при получении схем:', error);
    }
}
function generateInterface(name, schema, nestedSchemas, importStatements) {
    const properties = Object.entries(schema.properties).map(([key, value]) => {
        let type;
        if (value.$ref) {
            const refName = value.$ref.split('/').pop();
            type = refName;
        }
        else {
            type = getTypeFromSchemaProperty(value);
        }
        return `${key}: ${type}; // ${value.description || ''}`;
    }).join('\n');
    if (nestedSchemas[name]) {
        const { place, nameRef } = nestedSchemas[name];
        const importPath = `${place}`;
        importStatements.push(`import { ${nameRef} } from '${importPath}';`);
    }
    const importSection = importStatements.length > 0 ? `${importStatements.join('\n')}\n\n` : '';
    return `${importSection}export interface ${name} {\n${properties}\n}`;
}
function getTypeFromSchemaProperty(value) {
    switch (value.type) {
        case 'string': return 'string';
        case 'integer': return 'number';
        case 'boolean': return 'boolean';
        case 'array': return `${generateTypeForArray(value.items)}[]`;
        case 'object': return '{ [key: string]: any }';
        default: return 'unknown';
    }
}
function generateTypeForArray(item) {
    if (!item)
        return 'unknown';
    return item.$ref ? item.$ref.split('/').pop() : getTypeFromSchemaProperty(item);
}
async function main() {
    await ensureDirectoryExists(outputDir);
    await generateSchemas();
}
main().catch(error => {
    console.error('Ошибка при запуске основного скрипта:', error);
});
