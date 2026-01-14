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
      // console.log("Projects loaded:", projectsData);
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
    filtered = [...projectsData]; // all
  }

  renderProjects(filtered);
}

// -------- Render Projects Table --------
function renderProjects(data) {
  if (!Array.isArray(data)) return;
  const tbody = document.querySelector("#projectsTable tbody");
  tbody.innerHTML = "";

  data.forEach((proj) => {
    // console.log("Project image URL:", proj.img_url); // Debug

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${proj.title}</td>
      <td>${Array.isArray(proj.tech) ? proj.tech.join(", ") : "-"}</td>
      <td>
        <select onchange="updateBooleanField('${
          proj._id
        }', 'highlighted', this.value)">
          <option value="true" ${
            proj.highlighted ? "selected" : ""
          }>Yes</option>
          <option value="false" ${
            !proj.highlighted ? "selected" : ""
          }>No</option>
        </select>
      </td>
      <td>
        <select onchange="updateBooleanField('${
          proj._id
        }', 'Live', this.value)">
          <option value="true" ${proj.Live ? "selected" : ""}>Yes</option>
          <option value="false" ${!proj.Live ? "selected" : ""}>No</option>
        </select>
      </td>
      <td>${
        proj.img && proj.img_url
          ? `<img src="${proj.img_url}" alt="${proj.title}" width="100" />`
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

    const id = document.getElementById("projectId").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tech = JSON.parse(document.getElementById("tech").value || "[]");
    const github_link = document.getElementById("github_link").value;
    const livedemo_link = document.getElementById("livedemo_link").value;
    const highlighted = document.getElementById("highlighted").checked;
    const Live = document.getElementById("Live")?.checked || false;
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

    try {
      const url = id ? `${PROJECT_API}/${id}` : PROJECT_API;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const result = await res.json();

      if (result.success) {
        resetProjectForm();
        loadProjects();
      } else {
        console.error("Failed to save project:", result);
      }
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
      if (document.getElementById("Live"))
        document.getElementById("Live").checked = proj.Live;
    }
  } catch (err) {
    console.error("Error editing project:", err);
  }
}

// -------- Delete Project --------
async function deleteProject(id) {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch(`${PROJECT_API}/${id}`, { method: "DELETE" });
    const result = await res.json();

    if (result.success) loadProjects();
    else console.error("Failed to delete project:", result);
  } catch (err) {
    console.error("Error deleting project:", err);
  }
}

// -------- Reset Form --------
function resetProjectForm() {
  document.getElementById("projectForm")?.reset();
  document.getElementById("projectId").value = "";
}

// -------- Update Boolean Field Inline --------
async function updateBooleanField(id, field, value) {
  try {
    const formData = new FormData();
    formData.append(field, value === "true");

    await fetch(`${PROJECT_API}/${id}`, { method: "PUT", body: formData });
    loadProjects();
  } catch (err) {
    console.error(`Error updating ${field} for project ${id}:`, err);
  }
}

// -------- Filter Buttons Init --------
document
  .getElementById("filterAll")
  ?.addEventListener("click", () => filterProjects("all"));
document
  .getElementById("filterHighlighted")
  ?.addEventListener("click", () => filterProjects("highlighted"));
document
  .getElementById("filterNonHighlighted")
  ?.addEventListener("click", () => filterProjects("non-highlighted"));

// Initial load
loadProjects();
