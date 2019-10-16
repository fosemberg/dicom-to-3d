import * as React from 'react';
import {
  useParams
} from "react-router-dom";

const BuildPage: React.FC = () => {
  let { id } = useParams();
  return (
    <div>
      BuildPage: {id}
    </div>
  )
};

export default BuildPage;