# Работа с Docker

## 1. Если у вас нет Docker устанавливаем его по ссылке https://www.docker.com/get-started/

Проверить есть ли у вас Docker можно введя в консоль команду docker -v
Если ответ будет примерно таким Docker version 27.3.1, build ce12230 то поздравляю, Docker у вас есть.

## 2. Сборка image Docker

В консоли вводим команду npm run build:docker

Запускается процесс сборки image docker

## 3. Запуск container docker

В консоли вводим команду npm run start:docker

Теперь можно открыть приложение по адресу http://localhost:3000

## 4. Остановка container docker

В консоли вводим команду npm run stop:docker

Данная команда автоматически удалит данный container после остановки

## 5. Удаление image docker

В консоли вводим команду npm run delete:docker
