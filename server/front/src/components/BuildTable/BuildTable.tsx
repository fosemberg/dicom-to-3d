import * as React from 'react';
import {Table} from "react-bootstrap";
import BuildTableRow from "./-Row/BuildTableRow";
import BuildTableHeader from "./-Header/BuildTableHeader";

const BuildTable = () => {
  return (
    <Table className="BuildList" striped bordered hover>
      <BuildTableHeader/>
      <tbody>
      <BuildTableRow isOk={true} commitHash={'fe45da9'}/>
      <BuildTableRow isOk={false} commitHash={'fe45da9'}/>
      <BuildTableRow isOk={true} commitHash={'fe45da9'}/>
      </tbody>
    </Table>
  );
};

export default BuildTable;