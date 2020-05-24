# Dicom to 3d
система конвертации dicom файлов в 3d изображения.

[demo](http://84.201.135.0:3000)

## Технологии

dicom to 3d converter:
- **python**
- **SimpleITK**
- **vtk**
- **numpu**

Часть frontend: 
- **typescript** отличается от JavaScript возможностью явного статического назначения типов, что призвано повысить скорость разработки, облегчить читаемость, рефакторинг и повторное использование кода, помочь осуществлять поиск ошибок на этапе разработки и компиляции. Особенно был полезен для написания интерфейсов, использующихся одновременно в двух разных местах: сервер и агент.
- **express** - быстрый, гибкий, минималистичный веб-фреймворк для приложений Node.js. Использовался для реализации API, общения между серверами, взаимодействия с базой.
- **websocket** - протокол связи поверх TCP-соединения, предназначенный для обмена сообщениями между браузером и веб-сервером в режиме реального времени. Использовался для отображения статуса билдов в реальном времени.
- **nedb** - встраиваемая база данных для NodeJS, реализующая подмножество MongoDB API. Эта легкая NoSQL СУБД написана на чистом JavaScript, не имеет бинарных зависимостей. Использовалась для хранения исторической и текущей информации о сборках.
- **react** используется для разработки одностраничных приложений. Его цель — предоставить высокую скорость, простоту, масштабируемость и защиту от XSS атак. Испольозвася для написания интерфейса приложения.
- **creat react app** - отличный инструмент для быстрого старта React-приложений. Благодаря creat react app сэкономил много врмени на настройку окружения для React.
- **react bootstrap** - дизайн система. Сэкономила много времени на создание отзывчивого и красивого интейрфейса.

## Системные зависимости

- [python](https://www.python.org/)
- [nodejs](https://nodejs.org/en/)
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

## Схема работы приложения

```
title images to 3d
react->node js: images
node js->file system: images
react->node js: make 3d
node js->python cli: make 3d
file system->python cli:images
python cli->python cli:make 3d
file system<-python cli:3d
node js<-file system:3d
react<-node js:3d
react->react:visualate 3d
```

[![build_sequince_uml_diagram](docs/build_sequince_uml_diagram.png?2)](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIQWwIYHNIGdrAPbQMwBMAoAJ0gQGNgBaAPgDtM8YArVALlkRVQPsehZoAzEFGioAnqmCQ47eMjTFSFGr2ZtoiANYx8PBupoAHccAAWmWtDLgQ7bbsLDREqTOOmLVm3flcCJuaW1rYeQd62rA64TiIwrtJwADyUgV4hdnpq-KgpzvGSiax6JOTAKdksxYSlKtS1wKwAbiCoAK4I4AjSMUA)

[service for UML visualization](https://sequencediagram.org/)
