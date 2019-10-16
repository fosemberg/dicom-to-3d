import * as React from 'react';
import {Table} from "react-bootstrap";
import BuildTableRow from "./-Row/BuildTableRow";
import BuildTableHeader from "./-Header/BuildTableHeader";

const BuildTable = () => {
  return (
    <Table className="BuildList" striped bordered hover>
      <BuildTableHeader/>
      <tbody>
      <BuildTableRow id={1} isSuccess={true} commitHash={'fe45da9'}/>
      <BuildTableRow id={2} isSuccess={false} commitHash={'fe45da9'}/>
      <BuildTableRow id={3} isSuccess={true} commitHash={'fe45da9'}/>
      </tbody>
    </Table>
  );
};

export default BuildTable;