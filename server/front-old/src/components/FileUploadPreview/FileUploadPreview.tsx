import React from 'react'
import {Document, Page} from "react-pdf";
import {cn} from "@bem-react/classname";

import Loader from "../Loader/Loader";

import './FileUploadPreview.css'
import {Alert} from "react-bootstrap";

interface FileUploadPreviewProps {
  files: Array<File>;
  setIsSuccessLoad: (isSuccessLoad: boolean) => void;
}

const cnFileUploadPreview = cn('FileUploadPreview');

const FileUploadPreview: React.FC<FileUploadPreviewProps> = (
  {
    files,
    setIsSuccessLoad,
  }
) => {
  const urls = files.map(file => URL.createObjectURL(file))
  setIsSuccessLoad(true)
  return (
    <div className={cnFileUploadPreview()}>
      {
        urls.map(url => (
          <img src={url}/>
        ))
      }
    </div>
  )
}

export default FileUploadPreview;
