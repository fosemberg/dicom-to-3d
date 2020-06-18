import React from 'react';
import {generateStlUrl} from "../../utils/stl";
// @ts-ignore
import {STLViewer} from 'react-stl-obj-viewer';
import {Button, Card} from "react-bootstrap";

import './Projects.css'

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
          <Card key={name} className={`text-center Projects-Card`}>
            <Card.Header>{name}</Card.Header>
            <Card.Body className={'Projects-CardBody'}>
              {
                stls.map((stl) => {
                  const stlUrl = generateStlUrl({
                    projectName: name,
                    stlFileName: stl,
                  })
                  return <div className={''}>
                    <STLViewer
                      url={stlUrl}
                      width={400}
                      height={400}
                      modelColor='#B92C2C'
                      backgroundColor='#EAEAEA'
                    />
                    <br/>
                    <Button
                      href={stlUrl}
                      variant="primary"
                    >
                      Скачать stl файл
                    </Button>
                    </div>
                })
              }
            </Card.Body>
          </Card>
        ))
      }
    </div>
  )
}

export default Projects;
