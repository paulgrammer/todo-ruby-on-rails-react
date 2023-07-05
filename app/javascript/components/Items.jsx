import React from "react";
import Api from "../api";
import { Link } from "react-router-dom";

function Items({ project, onUpdate }) {
  const { items, id: projectId } = project;

  return (
    <ul className="space-y-2">
      {items.length > 0 ? (
        items.map((item) => (
          <li
            className="bg-white p-4 rounded shadow lg:flex items-center justify-between"
            key={item.id}
          >
            <Link
              to={`/projects/${projectId}/items/${item.id}/edit`}
              className={`${
                item.done ? "text-red-500 line-through" : "text-blue-500"
              } hover:underline`}
            >
              {item.description}
            </Link>
            {!item.done && (
              <div>
                <button
                  className="text-green-500 hover:text-green-600 mr-2"
                  onClick={() => {
                    Api.updateItem(projectId, item.id, {
                      done: true,
                    }).then(onUpdate);
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </li>
        ))
      ) : (
        <p className="text-center">No items.</p>
      )}
    </ul>
  );
}

export default Items;
