import * as React from 'react';
import {useEffect, useState} from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';
import {IClientBuildResult} from "../../utils/apiTypes";
import Loader from "../../components/Loader/Loader";
import {getAllBuildResults} from "../../store/store";
import {ACTION, crxClient, CrxClient, TYPE} from "../../utils/CrxClient";
import {Subscription} from "rxjs";

interface IMainPageProps {
  getData?: () => Promise<IClientBuildResult[]>;
}

// const _data = [];

const MainPage: React.FC<IMainPageProps> = (
  {
    getData = getAllBuildResults,
  }
  ) => {
  const [data, setData] = useState<IClientBuildResult[]>([]);
  // const _getData = () => data;

  const [subscription, setSubscription] = useState<Subscription>(new Subscription);

  useEffect(() => {
    let _getData = () => data;
    getData().then(
      (json) => {
        setData(json);
      }
    );
      setSubscription(crxClient.subject$
        .subscribe(
          (message: any) => {
            console.log('message from Subscribe: ', message);
            if (message.type === TYPE.EVENT) {
              if (message.action === ACTION.START_BUILD) {
                console.log('get', message);
                const startBuild: IClientBuildResult = message;
                setData([
                  startBuild,
                  ..._getData(),
                ])
              } else if (message.action === ACTION.BUILD_RESULT) {
                console.log('get', message);
              }
            }
          }
        ))
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