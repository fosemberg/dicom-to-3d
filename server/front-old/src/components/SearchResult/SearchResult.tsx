import React from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import {Alert, Image} from "react-bootstrap";

import {SearchResponse} from "../../utils/apiTypes";
import {SearchResultPageModal} from "../SearchResultPageModal/SearchResultPageModal";
import Loader from "../Loader/Loader";

import './SearchResult.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface SearchResultProps {
  searchResponse?: SearchResponse;
  className?: string;
}

const SearchResult: React.FC<SearchResultProps> = (
  {
    searchResponse = {},
    className= '',
  }
) => {
  return (
  <div className={`SearchResult ${className}`}>
    {
      searchResponse !== false
        ? Object.keys(searchResponse).length !== 0
          ? Object.keys(searchResponse[Object.keys(searchResponse)[0]]).length !== 0
            ? Object.keys(searchResponse).map(
              componentName => (
                Object.entries(searchResponse[componentName])
                  .sort(([page1, url1], [page2, url2]) => +page1 - +page2)
                  .map(([page, content]) => (
                    <div key={page} className="container">
                      <SearchResultPageModal
                        url={content["url"]}
                        show={false}
                        title={`Page ${page}`}
                      />
                      <div className='SearchResult__page'>
                        {Object.keys(content['images']).length === 0 ? (
                          <Document
                            file={content['url']}
                            loading={<Loader/>}
                          >
                            <Page
                              pageNumber={1}
                              className="SearchResultPageModal__page"
                            />
                          </Document>) : (
                            <>
                              {Object.entries(content['images']).map(
                                ([imageNum, imageUrl]) =>
                                  <Image
                                    key={imageNum}
                                    src={imageUrl}
                                    fluid
                                  />
                              )}
                            </>
                        )}
                      </div>
                    </div>
                  ))
              )
            )
            : <Alert variant='warning'>Nothing found in component with this name</Alert>
          : <Alert variant='warning'>There are no components with this name</Alert>
        : <Alert variant='danger'>We have an error on the server, we are already fixing</Alert>
    }
  </div>
)
}

export default SearchResult;
