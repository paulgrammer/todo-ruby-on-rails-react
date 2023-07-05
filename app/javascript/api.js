const baseURL = "/api/projects";

export default class Api {
  static async projects() {
    try {
      const { data } = await Api.request();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async project(id) {
    const { data } = await Api.request(id);
    return data;
  }

  static async request(path) {
    try {
      const response = await fetch(path ? `${baseURL}/${path}` : baseURL);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Error fetching data", error);
      return { error };
    }
  }

  static async submit(path = "", method = "GET", body = {}) {
    const params = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...Api.headers,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`${baseURL}/${path}`, params);
      const data = await response.json();
      return { data, status: response.status, statusText: response.statusText };
    } catch (error) {
      console.error(`Error ${method.toLowerCase()}ing project:`, error);
      return { error };
    }
  }

  static async createProject(title) {
    const { data, status } = await Api.submit("", "POST", {
      project: { title },
    });

    if (status == 422) {
      this.alertMessage("Project already exists!");
      return;
    }

    return data;
  }

  static async updateProject(id, title) {
    const body = { project: { title: title } };
    const { data } = await Api.submit(id, "PUT", body);
    return data;
  }

  static async deleteProject(id) {
    const { data } = await Api.submit(id, "DELETE");
    return data;
  }

  static async clearProject(id) {
    const { data } = await Api.submit(`${id}/clear`, "DELETE");
    Api.alertMessage(data.message);
  }

  static get headers() {
    const meta = document.querySelector('meta[name="csrf-token"]');

    return {
      "X-CSRF-Token": meta?.getAttribute("content"),
    };
  }

  static alertMessage(message) {
    alert(message);
  }

  static async createItem(projectId, description) {
    const { data } = await Api.submit(`${projectId}/items`, "POST", {
      item: { description },
    });

    return data?.id;
  }

  static async updateItem(projectId, id, update) {
    const body = { item: update };
    const { data } = await Api.submit(`${projectId}/items/${id}`, "PUT", body);

    return data?.id;
  }

  static async download_csv(projectId, filter) {
    let path = projectId
      ? `${projectId}/project_report.csv?filter=${filter}`
      : "projects_report.csv";

    const downloadLink = document.createElement("a");
    downloadLink.href = baseURL + "/" + path;
    downloadLink.click();
  }
}
