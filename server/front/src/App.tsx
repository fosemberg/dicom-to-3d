import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import MainPage from "./pages/MainPage/MainPage";
import CINavbar from "./components/CINavbar/CINavbar";
import BuildPage from "./pages/BuildPage/BuildPage";
import {cnTheme} from "./components/Theme";
import "./components/Theme/_color/Theme_color_project-default.scss";
import "./components/Theme/_space/Theme_space_default.scss";


const App: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Container className={cnTheme({color: 'project-default', space: 'default'},["p-3"])}>
      <CINavbar/>
      <Switch>
        <Route path='/' exact={true} component={MainPage}/>
        <Route path="/build/:id/:commitHash" component={BuildPage}/>
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;