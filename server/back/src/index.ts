import { config } from "dotenv"
config();

import {Response} from 'express';
import {app} from './expressApp';
import {
  STL_MODE_NAME,
} from './apiTypes';
import {STATIC_DIR} from "./constants";
import {SERVER_HTTP_PORT} from "../config/env";
import * as multer from "multer";
import * as fs from 'fs'
import * as path from 'path'
import {exec} from "child_process";

console.info('Server starting...');

const projectsFolder = path.join(STATIC_DIR, 'projects')

const upload = multer({dest: `${projectsFolder}/`})

const makeFolderIfNotExist = (path) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

const moveFileToProject = (file: any, projectName: string) => {
  /** When using the "single"
   data come in "req.file" regardless of the attribute "name". **/
  var oldPath = file.path;

  let newDir = path.join(projectsFolder, projectName)
  makeFolderIfNotExist(newDir)
  newDir = path.join(newDir, 'imgs')
  makeFolderIfNotExist(newDir)

  /** The original name of the uploaded file
   stored in the variable "originalname". **/
  const newPath = path.join(newDir, file.originalname)

  return fs.promises.rename(oldPath, newPath)
}

const pathToDicom2StlPy = `${__dirname}/../dicom2stl/dicom2stl.py`

interface StlMode {
  name: STL_MODE_NAME,
  mode: string,
}

const stlModes = [
  {
    name: STL_MODE_NAME.BONE,
    mode: '-t bone'
  },
  {
    name: STL_MODE_NAME.SKIN,
    mode: '-t skin'
  },
  {
    name: STL_MODE_NAME.FAT,
    mode: '-t fat'
  },
  {
    name: STL_MODE_NAME.I128,
    mode: '-i 128'
  },
  {
    name: STL_MODE_NAME.SOFT,
    mode: '--enable rotation -t soft_tissue'
  },
]

const makeStlInProject = (projectName: string, stlMode: StlMode) => {
  const pathToProject = path.join(projectsFolder, projectName)
  const command = `python3 ${pathToDicom2StlPy} ${stlMode.mode} -o ${path.join(pathToProject, `${stlMode.name}.stl`)} ${path.join(pathToProject, 'imgs')}`
  console.log('projectName', projectName)
  console.log('command', command)
  return new Promise((resolve, reject) => {
    exec(
      command,
      {},
      (error: Error, stdOut: string) =>
        error
          ? reject(error)
          : resolve(stdOut)
    );
  });
}

app.post(
  '/upload/:projectName',
  upload.array('file'),
  async (
    {
      params,
      files,
    },
    response: Response,
  ) => {
    try {
      const {projectName} = params
      const filenames = files.map(({filename, originalname}) => ({
        filename,
        originalname,
      })) // or file.originalname);
      console.log('projectName', projectName)
      console.log('filenames', filenames)

      await Promise.all(files.map(file => moveFileToProject(file, projectName)))

      const stdOut = await makeStlInProject(projectName, stlModes.find((stlMode) => stlMode.name === STL_MODE_NAME.SOFT))
      response.json({stdOut});
    } catch (e) {
      response.json({error: e.message})
    }
  }
);

app.post(
  '/upload2/:projectName',
  upload.array('file'),
  async (
    {
      params,
      files,
    },
    response: Response,
  ) => {
    try {
      const {projectName} = params
      const filenames = files.map(({filename, originalname}) => ({
        filename,
        originalname,
      })) // or file.originalname);
      console.log('projectName', projectName)
      console.log('filenames', filenames)

      await Promise.all(files.map(file => moveFileToProject(file, projectName)))

      let stdOut = ''
      for (const stlMode of stlModes) {
        stdOut += await makeStlInProject(projectName, stlMode)
      }

      response.json({stdOut});
    } catch (e) {
      response.json({error: e.message});
    }

  }
);

app.listen(SERVER_HTTP_PORT);

console.info(`Server http API available on: http://localhost:${SERVER_HTTP_PORT}`);
