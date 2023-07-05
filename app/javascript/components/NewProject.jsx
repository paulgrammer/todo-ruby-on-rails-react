import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";
import { useProject } from "../hooks";

function NewProjectPage() {
  const navigate = useNavigate();
  const [submitting, setSubmiting] = useState(false);
  const project = useProject();
  const { projectId } = useParams();

  const handleSubmit = (e) => {
    setSubmiting(true);
    e.preventDefault();

    const data = new FormData(e.target);
    const title = data.get("title");

    const request = projectId
      ? Api.updateProject(projectId, title)
      : Api.createProject(title);

    request
      .then(({ data }) => {
        setSubmiting(false);
        if (data?.id) {
          navigate(`/projects/${data?.id}`);
        }
      })
      .catch(() => setSubmiting(false));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {projectId ? "Edit" : "New"} Project
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-400 p-2 rounded w-full"
            defaultValue={project?.title}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={submitting}
        >
          {submitting
            ? "Submitting"
            : (projectId ? "Update" : "Create") + " Project"}
        </button>
      </form>
    </div>
  );
}

export default NewProjectPage;
