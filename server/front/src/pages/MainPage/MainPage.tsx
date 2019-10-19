import * as React from 'react';
import {useEffect, useState} from 'react';
import BuildTable from "../../components/BuildTable/BuildTable";
import BuildForm from "../../components/BuildForm/BuildForm";
import './MainPage.scss';
import {IClientBuildResult} from "../../utils/apiTypes";
import Loader from "../../components/Loader/Loader";
import {getAllBuildResults} from "../../store/store";
import {ACTION, crxClient, TYPE} from "../../utils/CrxClient";
import {Subscription} from "rxjs";

interface IMainPageProps {
  getData: () => Promise<IClientBuildResult[]>;
}

const MainPage: React.FC<IMainPageProps> = (
  {
    getData = getAllBuildResults
  }
  ) => {
  const [data, setData] = useState<IClientBuildResult[]>([]);
  const [subscription, setSubscription] = useState<Subscription>(new Subscription);

  useEffect(() => {
    getData().then((json) => setData(json));
    setTimeout(() => {
      crxClient.subscribeBar();

      setSubscription(crxClient.subject$
        .subscribe(
          (message: any) => {
            console.log('message from Subscribe: ', message);
            if (message.type === TYPE.EVENT && (message.action === ACTION.START_BUILD || message.action === ACTION.BUILD_RESULT)) {
              console.log('get', message);
            }
          }
        ))

    }, 1);
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