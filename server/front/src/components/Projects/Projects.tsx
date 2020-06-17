import React from 'react';

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
        projectsData.map(({name}: ProjectData) => (
          <div
            key={name}
          >
            {name}
          </div>
        ))
      }
    </div>
  )
}

export default Projects;
