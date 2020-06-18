import React from 'react';
import {generateStlUrl} from "../../utils/stl";
// @ts-ignore
import {STLViewer} from 'react-stl-obj-viewer';

export interface ProjectData {
  name: string;
  stls: Array<string>;
  imgs: Array<string>;
}

interface ProjectsProps {
  projectsData: Array<ProjectData>
}

const Projects: React.FC<ProjectsProps> = (
  {
    projectsData,
  }
) => {
  return (
    <div>
      {
        projectsData.map(({name, stls}: ProjectData) => (
          <div
              key={name}
          >
            {name}
            {
              stls.map((stl) => (
                <STLViewer
                  url={generateStlUrl({
                    projectName: name,
                    stlFileName: stl,
                  })}
                  width={400}
                  height={400}
                  modelColor='#B92C2C'
                  backgroundColor='#EAEAEA'
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Projects;
