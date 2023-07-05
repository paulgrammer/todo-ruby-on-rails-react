import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../api";
import Items from "./Items";

function ViewProjectPage() {
  const [project, setProject] = useState({ id: "", title: "", items: [] });
  const [exportFilter, setExportFilter] = useState("all")
  const { projectId } = useParams();

  const fetchProject = () => {
    Api.project(projectId).then(setProject);
  };

  useEffect(fetchProject, [projectId]);

  return (
    <div className="container mx-auto p-4">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <a
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => Api.download_csv(project.id)}
        >
          Export Items
        </a>
      </div> */}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <div className="flex items-center justify-end">
          <span className="mr-2">Export Items:</span>
          <select
            className="mr-2 border border-gray-400 rounded px-2 py-1"
            value={exportFilter}
            onChange={(e) => setExportFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
          <button
            className="text-blue-500 hover:underline cursor-pointer border border-blue-500 rounded px-4 py-2"
            onClick={() => Api.download_csv(project.id, exportFilter)}
          >
            Export
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Items</h2>
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => {
              Api.clearProject(projectId).then(fetchProject);
            }}
          >
            Clear Completed Items
          </a>
        </div>
        <Items project={project} onUpdate={fetchProject} />
      </div>
    </div>
  );
}

export default ViewProjectPage;
