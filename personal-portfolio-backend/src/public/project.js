const PROJECT_API = "http://localhost:5000/api/projects";
let projectsData = [];

// -------- Load Projects --------
async function loadProjects() {
  try {
    const res = await fetch(PROJECT_API);
    if (!res.ok) throw new Error("Failed to fetch projects");
    const result = await res.json();
    if (result.success) {
      projectsData = result.data || [];
      console.log("Loaded projects:", projectsData); // debug path
      renderProjects(projectsData);
    } else {
      console.error("Failed to load projects:", result);
    }
  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

// -------- Filter Projects --------
function filterProjects(filterType) {
  if (!Array.isArray(projectsData)) return;
  let filtered = [];
  if (filterType === "highlighted") {
    filtered = projectsData.filter((p) => p.highlighted);
  } else if (filterType === "non-highlighted") {
    filtered = projectsData.filter((p) => !p.highlighted);
  } else {
    filtered = [...projectsData];
  }
  renderProjects(filtered);
}

// -------- Render Projects Table --------
function renderProjects(data) {
  if (!Array.isArray(data)) return;
  const tbody = document.querySelector("#projectsTable tbody");
  tbody.innerHTML = "";

  data.forEach((proj) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${proj.title}</td>
      <td>${Array.isArray(proj.tech) ? proj.tech.join(", ") : "-"}</td>
      <td>${proj.highlighted ? "Yes" : "No"}</td>
      <td>${proj.Live ? "Yes" : "No"}</td>
      <td>${
        proj.img && proj.img_url
          ? `<img src="http://localhost:5000${proj.img_url}" alt="${proj.title}" width="100" />`
          : "—"
      }</td>
      <td>
        <button class="action-btn edit-btn" onclick="editProject('${
          proj._id
        }')">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteProject('${
          proj._id
        }')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// -------- Add / Update Project --------
document
  .getElementById("projectForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const id = document.getElementById("projectId").value;
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const tech = JSON.parse(document.getElementById("tech").value || "[]");
      const github_link = document.getElementById("github_link").value;
      const livedemo_link = document.getElementById("livedemo_link").value;
      const highlighted = document.getElementById("highlighted").checked;
      const Live = document.getElementById("Live").checked;
      const image = document.getElementById("image").files[0];

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tech", JSON.stringify(tech));
      formData.append("github_link", github_link);
      formData.append("livedemo_link", livedemo_link);
      formData.append("highlighted", highlighted);
      formData.append("Live", Live);
      if (image) formData.append("image", image);

      const method = id ? "PUT" : "POST";
      const url = id ? `${PROJECT_API}/${id}` : PROJECT_API;

      await fetch(url, { method, body: formData });
      resetProjectForm();
      loadProjects();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  });

// -------- Edit Project --------
async function editProject(id) {
  try {
    const res = await fetch(`${PROJECT_API}/${id}`);
    const result = await res.json();
    if (result.success) {
      const proj = result.data;
      document.getElementById("projectId").value = proj._id;
      document.getElementById("title").value = proj.title;
      document.getElementById("description").value = proj.description;
      document.getElementById("tech").value = JSON.stringify(proj.tech);
      document.getElementById("github_link").value = proj.github_link;
      document.getElementById("livedemo_link").value = proj.livedemo_link;
      document.getElementById("highlighted").checked = proj.highlighted;
      document.getElementById("Live").checked = proj.Live;
    }
  } catch (err) {
    console.error("Error editing project:", err);
  }
}

// -------- Delete Project --------
async function deleteProject(id) {
  try {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await fetch(`${PROJECT_API}/${id}`, { method: "DELETE" });
      loadProjects();
    }
  } catch (err) {
    console.error("Error deleting project:", err);
  }
}

// -------- Reset Form --------
function resetProjectForm() {
  document.getElementById("projectForm")?.reset();
  document.getElementById("projectId").value = "";
}

// -------- Init Filters --------
loadProjects();
