import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Document, Page} from "react-pdf";

import Loader from "../Loader/Loader";

import './SearchResultPageModal.css';


interface SearchResultPageModalProps {
  url?: string;
  title?: string;
  show: boolean;
}

export const SearchResultPageModal: React.FC<SearchResultPageModalProps> = (
  {
    url= "",
    title = "",
    show=false
  }
) => {
  const [open, setOpen] = useState(show);

  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  return (
    <div>
      <Button variant="link" onClick={handleShow}>
        {title}
      </Button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Body>
          <Document
            file={url}
            loading={<Loader/>}
          >
            <Page
              pageNumber={1}
              className="SearchResultPageModal__page"
            />
          </Document>
        </Modal.Body>
      </Modal>
    </div>
  )
}