import * as React from "react";
import {useState} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import {cn} from "@bem-react/classname";
// @ts-ignore
import {STLViewer} from 'react-stl-obj-viewer';

import {FileUploadRequest, FileUploadResponse, STL_MODE_NAME} from "../../utils/apiTypes";
import DwvComponent from '../DwvComponent/DwvComponent'
import {SERVER_STATIC_URL} from "../../config/env";

import "./UploadForm.css";

interface UploadFormProps {
  sendData?: (fileUploadRequest: FileUploadRequest) => Promise<FileUploadResponse>;
}

enum UploadStatus {
  init,
  uploading,
  success,
  error,
}

enum SendStatus {
  init,
  sending,
  success,
  error,
}

const cnUploadForm = cn('UploadForm');

function transliterate(word: any): string{
  let answer = ""
  let a: any = {};

  a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
  a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
  a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="a";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
  a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
  a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
  a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";

  for (const i in word){
    if (word.hasOwnProperty(i)) {
      if (a[word[i]] === undefined){
        answer += word[i];
      } else {
        answer += a[word[i]];
      }
    }
  }
  return answer;
}

const prepareProjectName = (projectName: string) => (
  transliterate(projectName)
    .replace(/ /g, '-')
)

const stlsFolderName = 'stls'

const generateStlUrl = (projectName: string, stlModeName: STL_MODE_NAME) => `${SERVER_STATIC_URL}/projects/${projectName}/${stlsFolderName}/${stlModeName}.stl`

const UploadForm: React.FC<UploadFormProps> = (
  {
    sendData = () => {
    }
  }
) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.init)
  const [sendStatus, setSendStatus] = useState<SendStatus>(SendStatus.init)
  const [responseMessage, setResponseMessage] = useState<string>('')

  const [dwvComponentKey, setDwvComponentKey] = useState(0)

  const [projectName, setProjectName] = useState<string>('');
  const onChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => (
    setProjectName(e.currentTarget.value)
  )

  const [projectNameSended, setProjectNameSended] = useState<string>('');

  const [file, setFile] = useState<File | undefined>();
  const [files, setFiles] = useState<Array<File> | undefined>()

  const isSuccessLoad = uploadStatus === UploadStatus.success ? true
    : uploadStatus === UploadStatus.error ? false
    : undefined

  const setIsSuccessLoad = (isSuccessLoad: boolean) => {
    isSuccessLoad
      ? setUploadStatus(UploadStatus.success)
      : setUploadStatus(UploadStatus.error)
  }

  const clearPreview = () => {
    setDwvComponentKey(dwvComponentKey + 1)
    setUploadStatus(UploadStatus.init)
    setSendStatus(SendStatus.init)
  }

  const sendFiles = async () => {
    if (files) {
      setSendStatus(SendStatus.sending)
      setUploadStatus(UploadStatus.init)
      const preparedProjectName = prepareProjectName(projectName)
      const response = await sendData({files, projectName: preparedProjectName})
      setProjectNameSended(preparedProjectName)

      response ? setSendStatus(SendStatus.success) : setSendStatus(SendStatus.error)
      console.log('response', response)

      if (response) {
        if (response.state === "success") {
          setSendStatus(SendStatus.success)
          setResponseMessage(response.stdOut)
        } else if (response.state === 'error') {
          setSendStatus(SendStatus.error)
          setResponseMessage(response.error)
        }
      }

      setProjectName('')
      setFile(undefined)
      setFiles(undefined)
    }
  };

  const onClickSubmitButton = () => (
    sendStatus === SendStatus.init
      ? sendFiles()
      : clearPreview()
  )

  const onUploadFile = (file: File) => {
    setUploadStatus(UploadStatus.uploading)
    setSendStatus(SendStatus.init)
    // !projectName && file.name && setProjectName(file.name)
    setFile(file)
  }

  const onUploadFiles = (files: Array<File>) => {
    setUploadStatus(UploadStatus.uploading)
    setSendStatus(SendStatus.init)
    setFiles(files)

    files.forEach((file: File, i: number) => {
      console.info('${i} ${file.name}', `${i} ${file.name}`)
    })
  }

  return (
    <>
    <Card className="UploadForm">
      <Card.Body>
        <Form
          className={cnUploadForm('Form')}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>имя проекта</Form.Label>
            <Form.Control
              value={projectName}
              onChange={onChangeProjectName}
              disabled={sendStatus === SendStatus.sending}
              type="text"
              placeholder="имя проекта"
            />
          </Form.Group>
          <DwvComponent
            className={cnUploadForm('DwvComponent')}
            {...{onUploadFiles, setIsSuccessLoad}}
            key={dwvComponentKey}
          />
          <Button
            onClick={onClickSubmitButton}
            className={cnUploadForm('Submit')}
            variant="primary"
            disabled={
              (sendStatus === SendStatus.init && (!isSuccessLoad || !projectName))
              || sendStatus === SendStatus.sending
            }
          >
            {
              sendStatus === SendStatus.sending
                ? <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {' '}
                  Распознавание и рендеринг 3D...
              </>
                : sendStatus === SendStatus.init
                  ? 'Загрузить'
                  : 'Очистить проект'
            }
          </Button>
          <div className={cnUploadForm('Result')}>
            {
              !files && sendStatus === SendStatus.success
                ? <Alert variant='success'>Файлы успешно загружены</Alert>
                : sendStatus === SendStatus.error && <Alert variant='danger'>Во время распознания и рендеринга произошла ошибка</Alert>
            }
          </div>
        </Form>
      </Card.Body>
    </Card>
      {
        sendStatus === SendStatus.success &&
        <div className={cnUploadForm('STLViewer')}>
          <STLViewer
          url={generateStlUrl(projectNameSended, STL_MODE_NAME.SOFT)}
          width={400}
          height={400}
          modelColor='#B92C2C'
          backgroundColor='#EAEAEA'
        />
        <br/>
          <Button
            href={generateStlUrl(projectNameSended, STL_MODE_NAME.SOFT)}
            variant="primary"
          >
            Скачать stl файл
          </Button>
          <br/>
        </div>
      }
      </>
  );
};

export default UploadForm;
