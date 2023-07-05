import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "./api";

export function useProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (projectId) {
      Api.project(projectId)
        .then((data) => {
          if (isMounted) {
            setProject(data);
          }
        })
        .catch((error) => { });
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  return project;
}
