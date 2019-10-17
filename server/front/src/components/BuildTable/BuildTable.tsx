import * as React from 'react';
import {Table} from "react-bootstrap";
import BuildTableRow from "./-Row/BuildTableRow";
import BuildTableHeader from "./-Header/BuildTableHeader";
import {Status} from "../../utils/apiTypes";

const BuildTable = () => {
  return (
    <Table className="BuildList" striped bordered hover>
      <BuildTableHeader/>
      <tbody>
      <BuildTableRow id={1} status={Status.building} commitHash={'fe45da9'}/>
      <BuildTableRow id={2} status={Status.success} commitHash={'fe45da9'}/>
      <BuildTableRow id={3} status={Status.fail} commitHash={'fe45da9'}/>
      </tbody>
    </Table>
  );
};

export default BuildTable;