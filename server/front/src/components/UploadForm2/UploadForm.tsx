import * as React from "react";
import {useState} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import {cn} from "@bem-react/classname";
// @ts-ignore
import {STLViewer} from 'react-stl-obj-viewer';

import {FileUploadRequest, FileUploadResponse, STL_MODE_NAME} from "../../utils/apiTypes";
import FileUploader from "../FileUploader/FileUploader";
import FileUploadPreview from "../FileUploadPreview/FileUploadPreview";
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

const stlModeNames = [
  STL_MODE_NAME.BONE,
  STL_MODE_NAME.SKIN,
  STL_MODE_NAME.I128,
  STL_MODE_NAME.SOFT,
]

const generateStlUrl = (projectName: string, stlModeName: STL_MODE_NAME) => `${SERVER_STATIC_URL}/projects/${projectName}/${stlModeName}.stl`

const UploadForm: React.FC<UploadFormProps> = (
  {
    sendData = () => {
    }
  }
) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.init)
  const [sendStatus, setSendStatus] = useState<SendStatus>(SendStatus.init)

  const [projectName, setProjectName] = useState<string>('');
  const onChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.currentTarget.value);

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

  const onClickSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (files) {
      setSendStatus(SendStatus.sending)
      setUploadStatus(UploadStatus.init)
      const response = await sendData({files, projectName: projectName})
      setProjectNameSended(projectName)
      response ? setSendStatus(SendStatus.success) : setSendStatus(SendStatus.error)
      setProjectName('')
      setFile(undefined)
      setFiles(undefined)
    }
  };

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
          />
          {/*<FileUploader*/}
          {/*  {...{onUploadFile, onUploadFiles, isSuccessLoad}}*/}
          {/*  isDisabled={sendStatus === SendStatus.sending}*/}
          {/*>*/}
          {/*  {sendStatus === SendStatus.sending && <div>*/}
          {/*    During dicom uploading, 3d generation is also performed. It can take more than two minutes to generate 3d model. Thank you for your patience and for using our service.*/}
          {/*  </div>*/}
          {/*  }*/}
          {/*</FileUploader>*/}
          <Button
            onClick={onClickSubmit}
            className={cnUploadForm('Submit')}
            variant="primary"
            type="submit"
            disabled={!isSuccessLoad || !projectName || sendStatus === SendStatus.sending}
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
                : 'Загрузить'
            }
          </Button>
          <div className={cnUploadForm('Result')}>
            {
              !!files
              ? <>
                  {/*{*/}
                  {/*  uploadStatus !== UploadStatus.error &&*/}
                  {/*    <h5 className={cnUploadForm('FilePreviewHeader')}>File preview</h5>*/}
                  {/*}*/}
                {/*<FileUploadPreview {...{files, setIsSuccessLoad}} />*/}
              </>
              : sendStatus === SendStatus.success
                ? <Alert variant='success'>Файлы успешно загружены</Alert>
                : sendStatus === SendStatus.error && <Alert variant='danger'>Во время загрузки файлов произошла ошибка</Alert>
            }
          </div>
        </Form>
      </Card.Body>
    </Card>
      {
        sendStatus === SendStatus.success &&
          <div>
            {stlModeNames.map((stlModeName) => (
              <div>
                <div className={cnUploadForm('STLViewer')}>
                  <STLViewer
                    url={generateStlUrl(projectNameSended, stlModeName)}
                    width={400}
                    height={400}
                    modelColor='#B92C2C'
                    backgroundColor='#EAEAEA'
                  />
                  <br/>
                  <Button
                    href={generateStlUrl(projectNameSended, stlModeName)}
                    variant="primary"
                  >
                    Скачать {stlModeName}.stl файл
                  </Button>
                  <br/>
                </div>
              </div>
            ) )}
          </div>

      }
      </>
  );
};

export default UploadForm;
