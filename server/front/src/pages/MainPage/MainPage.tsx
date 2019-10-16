import * as React from 'react';
import BuildList from "../../components/BuildList/BuildList";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';

const MainPage: React.FC = () => (
  <div className="MainPage">
    <BuildForm/>
    <BuildList/>
  </div>
);

export default MainPage;