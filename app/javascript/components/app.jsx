import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectsPage from "./Projects";
import NewProjectPage from "./NewProject";
import NewItemPage from "./NewItem";
import ViewProjectPage from "./ViewProject";
import NavBar from "./NavBar";

function App() {
  return (
    <Router>
      {/* Navigation */}
      <NavBar />

      {/* Page Content */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          <Route path="/projects/:projectId" element={<ViewProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<NewProjectPage />}
          />
          <Route
            path="/projects/:projectId/items/new"
            element={<NewItemPage />}
          />
          <Route
            path="/projects/:projectId/items/:itemId/edit"
            element={<NewItemPage />}
          />
        </Routes>
      </div>

      <p className="text-center">&copy; {new Date().getFullYear()}</p>
    </Router>
  );
}

export default App;
