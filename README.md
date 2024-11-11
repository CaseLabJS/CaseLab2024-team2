
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

## Работа с Docker

### 1. Установка Docker

Если у вас нет Docker, установите его по [ссылке](https://www.docker.com/get-started/).

Проверьте, установлен ли Docker, введя в консоль команду:

```bash
docker -v
```

Если вы видите что-то вроде `Docker version 27.3.1, build ce12230`, значит Docker установлен.

### 2. Сборка образа Docker

> **Примечание**: Если у вас включен WireGuard, сборка может не начаться. Сначала выполните сборку, а затем включите WireGuard.

Запустите команду:

```bash
npm run build:docker
```

### 3. Запуск контейнера Docker

Для запуска контейнера введите:

```bash
npm run start:docker
```

Теперь приложение будет доступно по адресу `http://localhost:5173`.

### 4. Остановка контейнера Docker

Чтобы остановить и автоматически удалить контейнер, выполните:

```bash
npm run stop:docker
```

### 5. Удаление образа Docker

Чтобы удалить образ Docker, используйте команду:

```bash
npm run delete:docker
```

---

## Расширение конфигурации ESLint

Для разработки продакшн-приложений рекомендуется обновить конфигурацию, чтобы включить правила lint, осведомленные о типах:

1. Настройте свойство `parserOptions` на верхнем уровне следующим образом:

   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   })
   ```

2. Замените `tseslint.configs.recommended` на `tseslint.configs.recommendedTypeChecked` или `tseslint.configs.strictTypeChecked`.
3. Опционально добавьте `...tseslint.configs.stylisticTypeChecked`.
4. Установите [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) и обновите конфигурацию:

   ```js
   // eslint.config.js
   import react from 'eslint-plugin-react'

   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   })
   ```
