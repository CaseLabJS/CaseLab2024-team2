import fs from 'fs';
import path from 'path';
import url from 'url';

// Получение пути к текущей директории
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Путь к папке со схемами
const outputDir = path.join(__dirname, 'schemas');

// Путь к файлу JSON со значениями для замены
const jsonFilePath = path.join(__dirname, 'values.json'); // Убедитесь, что этот файл существует

// Получение списка папок в указанной директории
function getFolders(dir: string): string[] {
    return fs.readdirSync(dir)
        .map(folder => path.join(dir, folder))
        .filter(stat => fs.statSync(stat).isDirectory());
}

// Получение файлов в указанной папке
function getFilesInFolder(folder: string): string[] {
    return fs.readdirSync(folder)
        .map(file => path.join(folder, file))
        .filter(stat => fs.statSync(stat).isFile());
}

// Получение ссылок на все типы с их путями для корректного импорта
function getTypeReferences(folders: string[]): Record<string, string> {
    const references: Record<string, string> = {};

    folders.forEach(folder => {
        const files = getFilesInFolder(folder);
        files.forEach(file => {
            const typeName = path.basename(file, '.ts');
            references[typeName] = file;
        });
    });

    console.log('Собранные ссылки на типы:', references); // Логируем собранные ссылки на типы
    return references;
}

// Загрузка значений из JSON-файла
function loadJsonValues(filePath: string): Record<string, string> {
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
}

// Замена unknown на вложенные типы с корректным путем импорта
function replaceUnknownTypes(content: string, folderPath: string, references: Record<string, string>, jsonValues: Record<string, string>): string {
    const imports: Set<string> = new Set(); // Хранение импортов для файла
    let modifiedContent = content;

    Object.entries(references).forEach(([type, typePath]) => {
        const relativePath = path.relative(folderPath, typePath).replace(/\\/g, '/').replace('.ts', '');

        const regex = new RegExp(`: unknown(\\s|;|\\[)`, 'g');
        let match;
        while ((match = regex.exec(modifiedContent)) !== null) {
            const replacementValue = jsonValues[type] || type; // Получаем значение замены из JSON
            console.log(`Заменяем 'unknown' на '${replacementValue}' в файле ${folderPath}. Используем путь: ${relativePath}`); // Лог замены
            modifiedContent = modifiedContent.replace(match[0], `: ${replacementValue}${match[1]}`);
            imports.add(`import { ${replacementValue} } from '${relativePath}';`);
        }
    });

    // Добавляем импорты в начало файла, если есть необходимые типы
    if (imports.size > 0) {
        const importStatements = Array.from(imports).join('\n');
        modifiedContent = `${importStatements}\n\n${modifiedContent}`;
    } else {
        console.log(`Не найдены типы для импорта в файле ${folderPath}.`); // Лог, если импортов нет
    }

    return modifiedContent;
}

// Основная функция для обновления типов после генерации схем
function updateTypesInFiles() {
    const folders = getFolders(outputDir);
    console.log('Найденные папки:', folders);

    // Получаем ссылки на все типы в проекте
    const references = getTypeReferences(folders);

    // Загружаем значения из JSON
    const jsonValues = loadJsonValues(jsonFilePath);

    folders.forEach(folder => {
        const files = getFilesInFolder(folder);
        console.log(`\n---\nОбрабатываем папку: ${folder}.\nНайденные файлы: ${files}`);

        files.forEach(file => {
            let content = fs.readFileSync(file, 'utf8');
            console.log(`Читаем файл: ${file}`);

            // Заменяем unknown и добавляем импорты
            const updatedContent = replaceUnknownTypes(content, folder, references, jsonValues);

            // Сохраняем только если были изменения
            if (content !== updatedContent) {
                fs.writeFileSync(file, updatedContent, 'utf8');
                console.log(`Файл обновлен: ${file}`);
            } else {
                console.log(`Типы в файле ${file} не изменены.`);
            }
        });
    });
}

// Запуск обновления типов
updateTypesInFiles();
