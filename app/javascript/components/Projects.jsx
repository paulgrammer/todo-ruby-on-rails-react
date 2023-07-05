import React, { useEffect, useState } from "react";
import Api from "../api";
import { Link } from "react-router-dom";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const fetchData = () => {
    Api.projects().then(setProjects);
  };

  useEffect(fetchData, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Project</h2>
        <a
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => Api.download_csv()}
        >
          Export Completed Items
        </a>
      </div>
      <ul className="space-y-2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li
              className="bg-white p-4 rounded shadow lg:flex items-center justify-between"
              key={project.id}
            >
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-500 hover:underline"
              >
                {project.title}
              </Link>
              <div>
                <Link
                  to={`/projects/${project.id}/edit`}
                  className="text-yellow-500 hover:text-yellow-600 mr-2"
                >
                  Update
                </Link>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => {
                    let yes = confirm("Are you sure?");

                    if (yes) {
                      Api.deleteProject(project.id).then(fetchData);
                    }
                  }}
                >
                  Destroy
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">No projects.</p>
        )}
      </ul>
    </div>
  );
}

export default ProjectsPage;
