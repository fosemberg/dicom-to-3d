import {Request, Response} from 'express';
import {app} from './expressApp';
import {
  IBody,
  IParams,

  IWithCommand,
  IWithCommitHash,
  IWithRepositoryId,
  IWithUrl,
} from './types';
import {
  IWithStdOut,
  IWithBuildId,
  IWithStatus,
  IBuild,
} from './apiTypes';
import {arrayFromOut, execCommandWithRes} from './utils';
import {PORT} from './config';

const {
  PATH_TO_REPOS,
  MESSAGE,
  RESPONSE,
} = require('./config');
const {createMessageObjectString} = require('./configUtils');
const DataStore = require('nedb');
import {DB_FULL_PATH} from "./config";

const db = new DataStore({
  filename: DB_FULL_PATH,
  autoload: true,
});

// сохранить результаты сборки.
// В параметрах: id сборки, статус, stdout и stderr процесса.
app.get(
  '/notify_build_result/:buildId/:status/:out',
  (
    {
      params: build,
    }: IParams<IBuild>,
    res: Response
  ) => {
    // send build to user

    const {buildId, status, stdOut} = build;

    db.update({_id: buildId}, {$set: {status, stdOut}});
    res.json({buildId, isGet: true});
  }
);

// DELETE /api/repos/:repositoryId
// Безвозвратно удаляет репозиторий
app.delete(
  '/api/repos/:repositoryId',
  ({params: {repositoryId}}: IParams<IWithRepositoryId>, res: Response) =>
    execCommandWithRes(
      `rm -rf ${PATH_TO_REPOS}/${repositoryId} &&
            echo '${createMessageObjectString(MESSAGE.REPOSITORY_DELETED)}'`,
      res,
      (x) => JSON.parse(x)
    )
);

// POST /api/repos/:repositoryId + { url: ‘repo-url’ }
// Добавляет репозиторий в список, скачивает его по переданной в теле запроса ссылке и добавляет в папку со всеми репозиториями c названием :repositoryId.
app.post(
  '/api/repos/:repositoryId',
  (
    {
      params: {repositoryId},
      body: {url},
    }: IParams<IWithRepositoryId> & IBody<IWithUrl>,
    res: Response
  ) => {
    console.log(repositoryId, url);
    execCommandWithRes(
      `cd ${PATH_TO_REPOS} &&
              git clone ${url.replace(
        /https?(:\/\/)/,
        'git$1'
      )} ${repositoryId} && 
              echo '${createMessageObjectString(MESSAGE.REPOSITORY_CLONED)}'`,
      res,
      (x) => JSON.parse(x),
      RESPONSE.NO_REPOSITORY(res)
    );
  }
);

// POST /api/repos + { url: ‘repo-url’ }
// Добавляет репозиторий в список, скачивает его по переданной в теле запроса ссылке и добавляет в папку со всеми репозиториями.
app.post('/api/repos', ({body: {url}}: IBody<IWithUrl>, res: Response) =>
  execCommandWithRes(
    `cd ${PATH_TO_REPOS} &&
                git clone ${url.replace(/https?(:\/\/)/, 'git$1')} && 
                echo '${createMessageObjectString(MESSAGE.REPOSITORY_CLONED)}'`,
    res,
    (x) => JSON.parse(x),
    RESPONSE.NO_REPOSITORY(res)
  )
);

app.listen(PORT);
