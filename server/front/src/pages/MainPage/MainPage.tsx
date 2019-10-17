import * as React from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';
import {Button} from "react-bootstrap";

const MainPage: React.FC = () => (
  <div className="MainPage">
    <Button variant="success">Success</Button>
    <Button variant="danger">Danger</Button>
    <BuildForm/>
    <BuildTable/>
  </div>
);

export default MainPage;