# fosemberg-ci
Простая система continuous integration.

[ТЗ](docs/TASK.md)

## Запуск

## Production запуск

#### Запуск server

```npm
cd server &&
npm install &&
npm start
```

Открыть в хроме:

http://localhost:5000 

#### Запуск agent

```npm
cd agent &&
npm install &&
npm start
```

#### Проверка функционала

Для проверки корректности работы Fosemberg CI можно вбить в форму:

commitHash: ```master```

command: ```sleep 10 & echo '10'```

отправить на сборку, нажав на кнопку: "Run build"

Повторить эту процеудуру несколько раз и тогда можно увидеть, что задачи отправляются на сервер и идет процесс сборки.

Чтобы ускроить сборку, можно поднять второго агента:

```npm
cd agent &&
npm install &&
npm run start-2
```

После этого процесс сборки будет выполняться параллельно на 2 разных агентах, что приведет к увеличению скорости сборки в 2 раза, при наличие задач в очереди.

Также в Fosemberg CI можно посмотреть подробности сборки, нажав на любую строку сборки. Чтобы вернуться обратно к главной странице приложения нажмите на шапку с названием: "Fosemberg CI" и вы вернетесь на главную страницу.

## Dev запуск

#### Запуск server back

```npm
cd server/back &&
npm install &&
npm run star
```

#### Запуск server front

```npm
cd server/front &&
yarn &&
yarn start
```

#### Запуск agent

```npm
cd agent &&
npm install &&
npm run start-dev
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

![](docs/build_sequince_uml_diagram.png)

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

![](docs/build_sequince_uml_diagram_detailed.png)





[service for UML visualization](https://sequencediagram.org/)