import * as React from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';

const MainPage: React.FC = () => (
  <div className="MainPage">
    <BuildForm/>
    <BuildTable/>
  </div>
);

export default MainPage;