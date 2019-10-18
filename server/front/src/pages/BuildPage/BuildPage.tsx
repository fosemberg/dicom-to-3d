import * as React from 'react';
import {useParams} from "react-router-dom";
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import {BuildId, IClientBuildDetailedResult, IClientBuildResult, Status} from "../../utils/apiTypes";
import {cn} from "@bem-react/classname";
import './BuildPage.scss';
import {getBuildDetailedResult} from "../../store/getData";
import {useState} from "react";
import {useEffect} from "react";
import Loader from "../../components/Loader/Loader";

interface IBuildPageProps {
  getData: (buildId: BuildId) => Promise<IClientBuildDetailedResult>;
}

const cnBuildPage = cn('BuildPage');

const isEmptyObject = (object: Object) => JSON.stringify(object) === '{}';

const BuildPage: React.FC<IBuildPageProps> = (
  {
    getData = getBuildDetailedResult
  }
) => {
  let {id} = useParams();
  const [data, setData] = useState<IClientBuildDetailedResult | {}>({});

  useEffect(() => {
    if (id) getData(id).then((json) => setData(json));
  }, []);

  return (
    <div className={cnBuildPage()}>
      {
        isEmptyObject(data)
          ? <Loader/>
          : <BuildDetails
            buildId={(data as IClientBuildDetailedResult).buildId}
            command={(data as IClientBuildDetailedResult).command}
            stdOut={(data as IClientBuildDetailedResult).stdOut}
            status={(data as IClientBuildDetailedResult).status}
            commitHash={(data as IClientBuildDetailedResult).commitHash}
          />
      }
    </div>
  )
};

export default BuildPage;