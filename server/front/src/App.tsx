import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import MainPage from "./pages/MainPage/MainPage";
import CINavbar from "./components/CINavbar/CINavbar";
import BuildPage from "./pages/BuildPage/BuildPage";
import {cnTheme} from "./components/Theme";
import "./components/Theme/_color/Theme_color_project-default.scss";
import "./components/Theme/_space/Theme_space_default.scss";
import {crxClient, CrxClient, WSReadyState} from "./utils/CrxClient";
import Loader from "./components/Loader/Loader";
import {getAllBuildResults} from "./store/store";


const App: React.FC = () => {
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    debugger;
    crxClient.isReady
      ? setReady(true)
      : crxClient.onReady = () => setReady(true)
  }, []);
  debugger;

  return (
    isReady
      ? <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Container className={cnTheme({color: 'project-default', space: 'default'}, ["p-3"])}>
          <CINavbar/>
          <Switch>
            <Route path='/' exact={true} component={() => <MainPage getData={getAllBuildResults}/>}/>
            <Route path="/build/:id/:commitHash" component={() => <BuildPage/>}/>
          </Switch>
        </Container>
      </BrowserRouter>
      : <Loader/>
  )
};

export default App;