import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import MainPage from "./pages/MainPage/MainPage";

const App: React.FC = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">Fosemberg CI</h1>
    </Jumbotron>

    <MainPage/>
  </Container>
);

export default App;