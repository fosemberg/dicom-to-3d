import React from 'react';
import {Spinner} from "react-bootstrap";

interface ProjectsProps {
  stls: Array<string>
}

const Projects: React.FC<ProjectsProps> = (
  {
    stls,
  }
) => {
  return (
    <div>
      {
        stls.map((stl: string) => (
          <div>
            {stl}
          </div>
        ))
      }
    </div>
  )
}

export default Projects;
