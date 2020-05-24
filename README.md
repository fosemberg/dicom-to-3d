# Dicom to 3d
система конвертации dicom файлов в 3d изображения.

## Технологии

dicom to 3d converter:
- python

Часть frontend: 
- **typescript** отличается от JavaScript возможностью явного статического назначения типов, что призвано повысить скорость разработки, облегчить читаемость, рефакторинг и повторное использование кода, помочь осуществлять поиск ошибок на этапе разработки и компиляции. Особенно был полезен для написания интерфейсов, использующихся одновременно в двух разных местах: сервер и агент.
- **express** - быстрый, гибкий, минималистичный веб-фреймворк для приложений Node.js. Использовался для реализации API, общения между серверами, взаимодействия с базой.
- **websocket** - протокол связи поверх TCP-соединения, предназначенный для обмена сообщениями между браузером и веб-сервером в режиме реального времени. Использовался для отображения статуса билдов в реальном времени.
- **nedb** - встраиваемая база данных для NodeJS, реализующая подмножество MongoDB API. Эта легкая NoSQL СУБД написана на чистом JavaScript, не имеет бинарных зависимостей. Использовалась для хранения исторической и текущей информации о сборках.
- **react** используется для разработки одностраничных приложений. Его цель — предоставить высокую скорость, простоту, масштабируемость и защиту от XSS атак. Испольозвася для написания интерфейса приложения.
- **creat react app** - отличный инструмент для быстрого старта React-приложений. Благодаря creat react app сэкономил много врмени на настройку окружения для React.
- **react bootstrap** - дизайн система. Сэкономила много времени на создание отзывчивого и красивого интейрфейса.

## Зависимости

- python
- [nodejs](https://nodejs.org/en/)
- [git](https://git-scm.com/downloads)
- [npm](https://www.npmjs.com/get-npm) (обычно устанавливается вместе с nodejs)
- [yarn](https://www.npmjs.com/package/yarn) (опционально, вместо yarn можно использовать во всех командах ниже npm)

## Dev запуск

#### Запуск server back

```npm
cd server/back &&
yarn &&
yarn run dev
```

#### Запуск server front

```npm
cd server/front-old &&
yarn &&
yarn run start
```

## Схемы работы приложения

### Общая схема сборки

```
title easy build process

client->server:build
server->agent:build
agent->server:notify_build_result
server->client:notify_build_result
```

![build_sequince_uml_diagram](docs/build_sequince_uml_diagram.png)

### Подробная схема сборки

```
title build process detailed

client->client:init
server->server:restore data from db
client->server:get_all_builds
server->client:all_builds
client->server:build
server->server:great empty build in db
server->agent:build
agent->server:notify_build_result
server->agent:i am alive
server->client:notify_build_result
server->server:save to db
```

![build_sequince_uml_diagram_detailed](docs/build_sequince_uml_diagram_detailed.png)

[service for UML visualization](https://sequencediagram.org/)
