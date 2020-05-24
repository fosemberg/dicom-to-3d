import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container from 'react-bootstrap/Container'

import SearchPage from "./pages/SearchPage/SearchPage";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import UploadPage from "./pages/UploadPage/UploadPage";
import Loader from "./components/Loader/Loader";
import {sendGetComponentNamesRequest, sendSearchRequest, sendUploadFileRequest} from "./store/store";
import {cnTheme} from "./components/Theme";

import "./components/Theme/_color/Theme_color_project-default.css";
import "./components/Theme/_space/Theme_space_default.css";

const App: React.FC = () => {
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
      setReady(true)
  }, []);

  return (
      isReady
          ? <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Container fluid className={cnTheme({color: 'project-default', space: 'default'}, ["p-0"])}>
              <AppNavbar/>
              <Container className="mt-3">
                <Switch>
                  <Route
                    path='/'
                    exact={true}
                    component={() => <SearchPage
                      sendData={sendSearchRequest}
                      getComponentNames={sendGetComponentNamesRequest}
                    />}
                  />
                  <Route
                    path="/upload"
                    component={() => <UploadPage
                      sendData={sendUploadFileRequest}
                    />}
                  />
                </Switch>
              </Container>
            </Container>
          </BrowserRouter>
          : <Loader/>
  )
};

export default App;