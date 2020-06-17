import React, {useState, useEffect} from 'react';
import Projects from "../../components/Projects/Projects";
import {getProjects} from "../../store/store";
import Loader from "../../components/Loader/Loader";

const ProjectsContainer = () => {
  const [projects, setProjects] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await getProjects()
      setIsFetching(false)

      if (response.state === 'success') {
        setProjects(response.projects)
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
            : <Projects stls={[]}/>
      }
    </div>
  )
}

export default ProjectsContainer;
