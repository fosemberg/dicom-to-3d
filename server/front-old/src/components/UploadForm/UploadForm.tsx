import * as React from "react";
import {useState} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import {cn} from "@bem-react/classname";
// @ts-ignore
import {STLViewer} from 'react-stl-obj-viewer';

import {FileUploadRequest, FileUploadResponse} from "../../utils/apiTypes";
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

const generateStlUrl = (projectName: string) => `${SERVER_STATIC_URL}/projects/${projectName}/index.stl`

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
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>project name</Form.Label>
            <Form.Control
              value={projectName}
              onChange={onChangeProjectName}
              disabled={sendStatus === SendStatus.sending}
              type="text"
              placeholder="project name"
            />
          </Form.Group>
          <DwvComponent/>
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
                  Uploading and recognition...
              </>
                : 'Upload'
            }
          </Button>
          <div className={cnUploadForm('Result')}>
            {
              !!files
              ? <>
                  {
                    uploadStatus !== UploadStatus.error &&
                      <h5 className={cnUploadForm('FilePreviewHeader')}>File preview</h5>
                  }
                <FileUploadPreview {...{files, setIsSuccessLoad}} />
              </>
              : sendStatus === SendStatus.success
                ? <Alert variant='success'>Files uploaded successfully</Alert>
                : sendStatus === SendStatus.error && <Alert variant='danger'>An error occurred while uploading the files</Alert>
            }
          </div>
        </Form>
      </Card.Body>
    </Card>
      {
        sendStatus === SendStatus.success && <>
          <STLViewer
          url={generateStlUrl(projectNameSended)}
          width={400}
          height={400}
          modelColor='#B92C2C'
          backgroundColor='#EAEAEA'
        />
        <br/>
          <Button
            href={generateStlUrl(projectNameSended)}
            variant="primary"
          >
            Download stl file
          </Button>
          <br/>
        </>
      }
      </>
  );
};

export default UploadForm;
