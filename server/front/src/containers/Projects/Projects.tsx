import React, {useState, useEffect} from 'react';
import Projects, {ProjectData} from "../../components/Projects/Projects";
import {getProjects} from "../../store/store";
import Loader from "../../components/Loader/Loader";

interface BaseItem {
  path: string;
  name: string;
  size: number;
}

export interface Directory extends BaseItem{
  type: 'directory';
  children: DirTreeItem[];
}

export interface File extends BaseItem{
  type: 'file';
  size: number;
  extension: string;
}

type DirTreeItem = Directory | File;

const ProjectsContainer = () => {
  const [projects, setProjects] = useState([])
  const [projectsData, setProjectsData] = useState<Array<ProjectData>>([])
  const [stls, setStls] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await getProjects()
      setIsFetching(false)

      if (response.state === 'success') {
        const {projects} = response
        setProjects(projects)
        setProjectsData(projects.children.map(
          (project: BaseItem) => (
            {
              name: project.name,
              imgs: [],
              stls: [],
            }
          )
        ))

      } else {
        setIsError(true)
      }
    })()
  }, []);

  // @ts-ignore
  window.projects = projects
  return (
    <div>
      {
        isFetching
          ? <Loader/>
          : isError
            ? <div>Ошибка</div>
            : <Projects projectsData={projectsData}/>
      }
    </div>
  )
}

export default ProjectsContainer;
