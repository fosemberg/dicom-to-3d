import * as React from 'react';
import {Table} from "react-bootstrap";
import BuildTableRow from "./-Row/BuildTableRow";
import BuildTableHeader from "./-Header/BuildTableHeader";
import {IClientBuildResult, Status} from "../../utils/apiTypes";

interface IBuildTableProps {
  data: IClientBuildResult[];
}

const BuildTable: React.FC<IBuildTableProps> = ({data}) => {
  return (
    <Table className="BuildList" striped bordered hover>
      <BuildTableHeader/>
      <tbody>
      {
        data.map(
          ({buildId, status, commitHash})  =>
            <BuildTableRow id={buildId} status={status} commitHash={commitHash}/>
        )
      }
      </tbody>
    </Table>
  );
};

export default BuildTable;