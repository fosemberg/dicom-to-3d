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

          setProjectsData(
            projects.children
              .map(
                (project: DirTreeItem) => {
                  if ("children" in project) {

                    let imgs: Array<string> = []
                    const imgsFolder = project.children
                      .find((projectItem: DirTreeItem) => projectItem.name === "imgs")

                    if (imgsFolder && "children" in imgsFolder) {
                      imgs = imgsFolder.children.map((img: DirTreeItem) => img.name)
                    }

                    let stls: Array<string> = []
                    const stlsFolder = project.children
                      .find((projectItem: DirTreeItem) => projectItem.name === "stls")

                    if (stlsFolder && "children" in stlsFolder) {
                      stls = stlsFolder.children.map((stl: DirTreeItem) => stl.name)
                    }

                    return {
                      name: project.name,
                      imgs: imgs,
                      stls: stls,
                    }
                  }
                }
              )
              .filter((project: any) => project)
              .filter(({name, stls}: ProjectData) => name && stls.length)
          )
      } else {
        setIsError(true)
      }
    })()
  }, []);

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
