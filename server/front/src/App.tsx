import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import MainPage from "./pages/MainPage/MainPage";
import CINavbar from "./components/CINavbar/CINavbar";
import BuildPage from "./pages/BuildPage/BuildPage";

const App: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Container className="p-3">
      <CINavbar/>
      <Switch>
        <Route path='/' exact={true} component={MainPage}/>
        <Route path="/build/:id" component={BuildPage}/>
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;