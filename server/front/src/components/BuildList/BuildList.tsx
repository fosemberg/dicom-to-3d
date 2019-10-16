import * as React from 'react';
import {Table} from "react-bootstrap";
import { MdCheck, MdClose } from "react-icons/md";

const BuildList = () => {
  return (
    <Table className="BuildList" striped bordered hover>
      <thead>
      <tr>
        <th>OK</th>
        <th>commit hash</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><MdCheck/></td>
        <td>fe45da9</td>
      </tr>
      <tr>
        <td><MdClose/></td>
        <td>fe45da9</td>
      </tr>
      <tr>
        <td><MdCheck/></td>
        <td>fe45da9</td>
      </tr>
      </tbody>
    </Table>
  );
};

export default BuildList;