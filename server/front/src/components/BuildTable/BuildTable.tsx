import * as React from 'react';
import {Table} from "react-bootstrap";
import BuildTableRow from "./-Row/BuildTableRow";
import BuildTableHeader from "./-Header/BuildTableHeader";
import {IClientBuildResult} from "../../utils/apiTypes";

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
          (buildTableRowProps)  =>
            <BuildTableRow
              key={buildTableRowProps.buildId}
              {...buildTableRowProps}
            />
        )
      }
      </tbody>
    </Table>
  );
};

export default BuildTable;