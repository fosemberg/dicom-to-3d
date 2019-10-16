import * as React from 'react';
import {Card} from "react-bootstrap";

interface IBuildDetailsProps {
  id: number;
  commitHash: string;
  startDate: string;
  endDate: string;
  status: string;
  output: string;
}

const BuildDetails = ({}: IBuildDetailsProps) => {
  return (
    <Card className="BuildDetails">
      <Card.Body>This is some text within a card body.
      </Card.Body>
    </Card>
  );
};

export default BuildDetails;