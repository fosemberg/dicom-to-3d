import * as React from 'react';
import {useState} from "react";
import {cn} from "@bem-react/classname";

// @ts-ignore
import {STLViewer} from 'react-stl-obj-viewer';

import {FileUploadRequest, FileUploadResponse} from "../../utils/apiTypes";
import UploadForm from "../../components/UploadForm/UploadForm";

import './UploadPage.css';

interface UploadPageProps {
  sendData: (fileUploadRequest: FileUploadRequest) => Promise<FileUploadResponse>;
}

const cnBuildPage = cn('UploadPage');

class UploadPage extends React.Component<UploadPageProps> {

  render() {
    const {
      props: { sendData },
    } = this;

    return (
      <div className={cnBuildPage()}>
        <h4>Upload dicom files to generate 3d image</h4>
        <UploadForm {...{sendData}} />
        {/*<STLViewer*/}
        {/*  url='http://localhost:3021/static/projects/big1/index.stl'*/}
        {/*  width={400}*/}
        {/*  height={400}*/}
        {/*  modelColor='#B92C2C'*/}
        {/*  backgroundColor='#EAEAEA'*/}
        {/*/>*/}
      </div>
    )
  }
}

export default UploadPage;
