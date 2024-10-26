import axios from "axios";
import path from 'path';
import fs from 'fs';
import url from 'url';
// Получение пути к текущей директории
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
// URL вашего API для получения схем
const apiUrl = 'http://172.18.27.102:8080/v3/api-docs';
// Путь к папке, где вы хотите сохранить файлы
const outputDir = path.join(__dirname, 'schemas');
// Убедитесь, что директория существует
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
// Основная функция для получения схем и генерации файлов
async function generateSchemas() {
    try {
        const response = await axios.get(apiUrl);
        const schemas = response.data.components.schemas;
        // Объединяем интерфейсы в группы по первому слову
        const groupedSchemas = {};
        for (const [name, schema] of Object.entries(schemas)) {
            const groupName = name.split(/(?=[A-Z])/)[0]; // Получаем первое слово для группировки
            if (!groupedSchemas[groupName]) {
                groupedSchemas[groupName] = [];
            }
            groupedSchemas[groupName].push({ name, schema });
        }
        // Создание файлов по группам
        for (const [groupName, interfaces] of Object.entries(groupedSchemas)) {
            const groupDir = path.join(outputDir, groupName);
            // Убедимся, что директория группы существует
            if (!fs.existsSync(groupDir)) {
                fs.mkdirSync(groupDir);
            }
            // Генерация файла для импорта
            const importFilePath = path.join(groupDir, `${groupName}.ts`);
            const importStatements = [];
            for (const { name, schema } of interfaces) {
                const interfaceContent = generateInterface(name, schema);
                const filePath = path.join(groupDir, `${name}.ts`);
                fs.writeFileSync(filePath, interfaceContent, 'utf8');
                console.log(`Создан файл: ${filePath}`);
                importStatements.push(`export * from './${name}';`);
            }
            // Запись в файл импорта
            fs.writeFileSync(importFilePath, importStatements.join('\n'), 'utf8');
            console.log(`Создан файл импорта: ${importFilePath}`);
        }
    }
    catch (error) {
        console.error('Ошибка при получении схем:', error);
    }
}
// Функция для генерации интерфейса TypeScript
function generateInterface(name, schema) {
    const properties = Object.entries(schema.properties).map(([key, value]) => {
        let type;
        switch (value.type) {
            case 'string':
                type = 'string';
                break;
            case 'integer':
                type = 'number'; // В TypeScript используем number для целых чисел
                break;
            case 'boolean':
                type = 'boolean';
                break;
            case 'array':
                type = `${generateTypeForArray(value.items)}[]`; // Обработка массивов
                break;
            case 'object':
                type = `{ [key: string]: any }`; // Или создайте интерфейс для вложенных объектов
                break;
            default:
                type = 'unknown'; // На случай, если тип неизвестен
        }
        return `  ${key}: ${type}; // ${value.description || ''}`;
    }).join('\n');
    return `export interface ${name} {\n${properties}\n}`;
}
// Вспомогательная функция для обработки типов массивов
function generateTypeForArray(item) {
    if (!item)
        return 'unknown'; // Если элемент не определен, возвращаем unknown
    switch (item.type) {
        case 'string':
            return 'string';
        case 'integer':
            return 'number';
        // Добавьте другие типы по необходимости
        default:
            return 'unknown';
    }
}
// Запустите генерацию схем
generateSchemas();
