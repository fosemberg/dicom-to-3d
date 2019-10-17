import {Request, Response} from 'express';
import {app} from './expressApp';
import {IBody, IParams, IWithBuildId, IWithCommand, IWithCommitHash, IWithRepositoryId, IWithUrl,} from './types';
import {arrayFromOut, execCommandWithRes} from './utils';
import {PORT} from './config';

const {
  PATH_TO_REPOS,
  MESSAGE,
  RESPONSE,
} = require('./config');
const { createMessageObjectString } = require('./configUtils');

// Возвращает массив репозиториев, которые имеются в папке.
app.get('/api/repos', (req: Request, res: Response) =>
  execCommandWithRes(
    `cd ${PATH_TO_REPOS} &&
            ls`,
    res,
    arrayFromOut
  )
);

// Возвращает массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания.
// с пагинацией для списка коммитов
app.get(
  '/build/:buildId/:repositoryId/:commitHash/:command',
  (
    {
      params: { buildId, repositoryId, commitHash, command },
    }: IParams<IWithBuildId & IWithRepositoryId & IWithCommitHash & IWithCommand>,
    res: Response
  ) =>
    execCommandWithRes(
      `cd ${PATH_TO_REPOS}/${repositoryId} &&
            git checkout -q ${commitHash} &&
            ${command}`,
      res
    )
);

// DELETE /api/repos/:repositoryId
// Безвозвратно удаляет репозиторий
app.delete(
  '/api/repos/:repositoryId',
  ({ params: { repositoryId } }: IParams<IWithRepositoryId>, res: Response) =>
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
      params: { repositoryId },
      body: { url },
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
app.post('/api/repos', ({ body: { url } }: IBody<IWithUrl>, res: Response) =>
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
