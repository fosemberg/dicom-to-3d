import * as React from 'react';
import {useParams} from "react-router-dom";
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import {Status} from "../../utils/types";
import {cn} from "@bem-react/classname";
import './BuildPage.scss';

const cnBuildPage = cn('BuildPage')

const BuildPage: React.FC = () => {
  let {id, commitHash} = useParams();
  return (
    <div className={cnBuildPage()}>
      <BuildDetails
        id={Number(id)}
        commitHash={String(commitHash)}
        status={Status.success}
        startDate={'now'}
        endDate={'never'}
        output={'everything build good'}
      />
    </div>
  )
};

export default BuildPage;