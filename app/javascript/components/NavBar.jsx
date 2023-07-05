import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  const showItemsLinks = useMemo(() => {
    let parts = location.pathname.split("/");
    let secondLast = parts[parts.length - 2];
    let last = parts[parts.length - 1];
    return secondLast == "projects" && Number(last) > 0;
  }, [location]);

  const projectId = useMemo(() => {
    let parts = location.pathname.split("/");
    return parts[parts.length - 1];
  }, [location]);

  const links = [
    { name: "Projects", path: "projects", show: !showItemsLinks },
    { name: "New Project", path: "/projects/new", show: !showItemsLinks },
    {
      name: "New Item",
      path: `/projects/${projectId}/items/new`,
      // when projects/id, show
      show: showItemsLinks,
    },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Todo App
        </Link>
        <ul className="flex space-x-4">
          {links
            .filter((link) => link.show)
            .map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="hover:text-gray-300">
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
