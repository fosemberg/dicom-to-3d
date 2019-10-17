import * as React from 'react';
import {useParams} from "react-router-dom";
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import {Status} from "../../utils/types";

const BuildPage: React.FC = () => {
  let { id, commitHash } = useParams();
  return (
    <BuildDetails
      id={Number(id)}
      commitHash={String(commitHash)}
      status={Status.success}
      startDate={'now'}
      endDate={'never'}
      output={'everything build good'}
    />
  )
};

export default BuildPage;