import * as React from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';
import {IClientBuildResult} from "../../utils/apiTypes";
import {useEffect, useState} from "react";
import Loader from "../../components/Loader/Loader";
import {getAllBuildResults} from "../../store/store";

interface IMainPageProps {
  getData: () => Promise<IClientBuildResult[]>;
}

const MainPage: React.FC<IMainPageProps> = (
  {
    getData = getAllBuildResults
  }
  ) => {
  const [data, setData] = useState<IClientBuildResult[]>([]);

  useEffect(() => {
    getData().then((json) => setData(json));
  }, []);

  return (
    <div className="MainPage">
      <BuildForm/>
      {
        data.length !== 0
        ? <BuildTable data={data}/>
        : <Loader/>
      }
    </div>
  )
};

export default MainPage;