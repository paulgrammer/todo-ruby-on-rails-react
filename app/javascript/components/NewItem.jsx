import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";
import { useProject } from "../hooks";

function NewItemPage() {
  const navigate = useNavigate();
  const [submitting, setSubmiting] = useState(false);
  const [item, setItem] = useState(null);
  const { projectId, itemId } = useParams();
  const project = useProject();

  const handleSubmit = (e) => {
    setSubmiting(true);
    e.preventDefault();

    const data = new FormData(e.target);
    const description = data.get("description");
    const done = data.get("done") || false;

    const request = itemId
      ? Api.updateItem(projectId, itemId, { description, done })
      : Api.createItem(projectId, description);

    request
      .then((id) => {
        setSubmiting(false);
        navigate(`/projects/${projectId}`);
      })
      .catch(() => setSubmiting(false));
  };

  const findItem = () => {
    if (project) {
      setItem(project.items.find((i) => i.id == itemId));
    }
  };

  useEffect(findItem, [project]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {itemId ? "Edit" : "New"} Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            className="border border-gray-400 p-2 rounded w-full"
            id="description"
            name="description"
            defaultValue={item?.description}
          />
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            id="done"
            name="done"
            defaultChecked={item?.done}
          />
          <label htmlFor="done" className="ml-2">
            Done?
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {submitting ? "Submitting" : (itemId ? "Update" : "Create") + " Item"}
        </button>
      </form>
    </div>
  );
}

export default NewItemPage;
