const API = "http://localhost:5000/api/profile";
const socials = [
  "github",
  "linkedin",
  "instagram",
  "facebook",
  "gmail",
  "twitter",
];

/* -------- Tabs -------- */
function showTab(tab) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  document
    .querySelector(`button[onclick="showTab('${tab}')"]`)
    .classList.add("active");
  document.getElementById(`${tab}Tab`).classList.add("active");
}

/* -------- Load Existing Data -------- */
async function loadProfile() {
  // Resume
  const resumeRes = await fetch(`${API}/resume`);
  const resumeData = await resumeRes.json();
  document.getElementById("currentResume").innerText =
    resumeData.resumeUrl || "—";

  // Socials
  for (const s of socials) {
    const res = await fetch(`${API}/social/${s}`);
    const data = await res.json();
    document.getElementById(`current-${s}`).innerText = data[s] || "—";
  }
}

/* -------- Resume -------- */
async function updateResume() {
  const resumeUrl = document.getElementById("resumeInput").value;
  await fetch(`${API}/resume`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeUrl }),
  });
  loadProfile();
}

async function deleteResume() {
  await fetch(`${API}/resume`, { method: "DELETE" });
  document.getElementById("resumeInput").value = "";
  loadProfile();
}

/* -------- Socials -------- */
async function saveSocial(platform) {
  const url = document.getElementById(platform).value;
  await fetch(`${API}/social/${platform}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  loadProfile();
}

async function deleteSocial(platform) {
  await fetch(`${API}/social/${platform}`, { method: "DELETE" });
  document.getElementById(platform).value = "";
  loadProfile();
}

/* Init */
loadProfile();
