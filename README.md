
# CaseLabJS2024-team2

## React + TypeScript + Vite

Этот проект использует минимальную настройку для работы React в Vite с поддержкой горячей перезагрузки (HMR) и некоторыми правилами ESLint.

### Используемые плагины:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) — использует [Babel](https://babeljs.io/) для Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) — использует [SWC](https://swc.rs/) для Fast Refresh.

---

## Установка и запуск проекта

### Требования

- **Node.js**: версия 18 и выше

### Установка зависимостей

1. Клонируйте репозиторий и перейдите в директорию проекта:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

### Запуск проекта

- **Режим разработки**:

   ```bash
   npm run dev
   ```

- **Сборка для продакшена**:

   ```bash
   npm run build
   ```

- **Предпросмотр собранного проекта**:

   ```bash
   npm run preview
   ```

### Дополнительные команды

- **Линтинг кода**:

   ```bash
   npm run lint
   ```

- **Компиляция TypeScript с отдельным конфигом**:

   ```bash
   npm run compile:splitjs
   ```

- **Генерация типов**:

   ```bash
   npm run gen:types
   ```

---

## Расширение конфигурации ESLint

Для разработки продакшн-приложений рекомендуется обновить конфигурацию, чтобы включить правила lint, осведомленные о типах:

- Настройте свойство `parserOptions` на верхнем уровне следующим образом:

```js
export default tseslint.config({
  languageOptions: {
    // другие опции...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Замените `tseslint.configs.recommended` на `tseslint.configs.recommendedTypeChecked` или `tseslint.configs.strictTypeChecked`.
- Опционально добавьте `...tseslint.configs.stylisticTypeChecked`.
- Установите [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) и обновите конфигурацию:
# Работа с Docker

## 1. Если у вас нет Docker устанавливаем его по ссылке https://www.docker.com/get-started/

Проверить есть ли у вас Docker можно введя в консоль команду docker -v
Если ответ будет примерно таким Docker version 27.3.1, build ce12230 то поздравляю, Docker у вас есть.

## 2. Сборка image Docker
(Кстати заметил, что при включенном WireGuard сборка не происходит, так что сначала делаем сборку а потом уже включаем WireGuard)

В консоли вводим команду npm run build:docker

Запускается процесс сборки image docker

## 3. Запуск container docker

В консоли вводим команду npm run start:docker

Теперь можно открыть приложение по адресу http://localhost:5173

## 4. Остановка container docker

<<<<<<< HEAD
export default tseslint.config({
  // Укажите версию react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Добавьте плагин react
    react,
  },
  rules: {
    // другие правила...
    // Включите его рекомендуемые правила
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

---

=======
В консоли вводим команду npm run stop:docker

Данная команда автоматически удалит данный container после остановки

## 5. Удаление image docker

В консоли вводим команду npm run delete:docker
>>>>>>> main
