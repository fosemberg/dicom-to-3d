import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import MainPage from "./pages/MainPage/MainPage";
import CINavbar from "./components/CINavbar/CINavbar";
import BuildPage from "./pages/BuildPage/BuildPage";
import {cnTheme} from "./components/Theme";
import "./components/Theme/_color/Theme_color_project-default.scss";
import "./components/Theme/_space/Theme_space_default.scss";
import {crxClient} from "./utils/CrxClient";
import Loader from "./components/Loader/Loader";
import {getAllBuildResults, getBuildDetailedResult} from "./store/store";


const App: React.FC = () => {
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    crxClient.isReady
      ? setReady(true)
      : crxClient.onReady = () => setReady(true)
  }, []);

  return (
    isReady
      ? <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Container className={cnTheme({color: 'project-default', space: 'default'}, ["p-3"])}>
          <CINavbar/>
          <Switch>
            <Route path='/' exact={true} component={() => <MainPage getData={getAllBuildResults}/>}/>
            <Route path="/build/:id" component={() => <BuildPage getData={getBuildDetailedResult}/>}/>
          </Switch>
        </Container>
      </BrowserRouter>
      : <Loader/>
  )
};

export default App;