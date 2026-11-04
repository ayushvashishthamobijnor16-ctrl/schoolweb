// ---- Sample exhibits (replace with your own, or wire this array up to a backend later) ----
let projects = [
  {
    title: "Respiratory System Model",
    student: "Ashma , Divya,Shivika — Grade 7",
    category: "Science",
    description: "A model of the human respiratory system built from everyday materials. Demonstrates how air flows through the lungs and how the diaphragm assists in breathing.",
    video: "videos/respiratory system.mp4",
  },
  {
    title: "Hemodialysis ",
    student: "Angel , Vidushi — Grade 9",
    category: "Science",
    description: "Hemodialysis is a medical procedure that uses a machine and a special filter called an artificial kidney to clean toxins, waste products, and excess fluids from the blood when a person's kidneys can no longer do so properly",
    video: "videos/hemodialysis.mp4",
  },
  {
    title: "Water Cycle Model",
    student: "Shorya , Divyanshu — Grade 7",
    category: "Science",
    description: "A model demonstrating the water cycle, including evaporation, condensation, and precipitation. Shows how water moves through the environment.",
    video: "videos/water cycle.mp4",
  },
  {
    title: "Acid Rain",
    student: "Shagun , Mahi , Pari , Yashvi — Grade 8",
    category: "Science",
    description: "A model demonstrating the effects of acid rain on the environment, including its impact on plants and aquatic ecosystems.",
    video: "videos/acidrain.mp4",
  },
    {
    title: "Water Dam Model",
    student: "Anubhav , Ashfahad , Harsh , Shubh , Vansh  — Grade 9",
    category: "Science",
    description: "A model demonstrating the effects of water dams on the environment, including its impact on local ecosystems.",
    video: "videos/water dam.mp4",
  },
   {
    title: "Day and night  Model",
    student: "Shadan — Grade 6",
    category: "Science",
    description: "A model demonstrating the effects of the earth's rotation on the cycle of day and night.",
    video: "videos/dayandnight.mp4",
  },
  

  {
    title: "Sources of Indian History and Vocalno",
    student: "Aditi ,Divya , Ashma , Shivika— Grade 7",
    category: "S.studies",
    description: "A model demonstrating the sources of Indian history, including archaeological findings and historical texts.",
    video: "videos/indian history.mp4",
  },
];

const grid = document.getElementById("projectGrid");
const tabs = document.getElementById("categoryTabs");
let activeCategory = "all";

function render() {
  grid.innerHTML = "";
  const visible = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  visible.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.setProperty("--tilt", (i % 2 === 0 ? "-0.6deg" : "0.6deg"));
    card.innerHTML = `
      <video src="${p.video}" muted preload="metadata"></video>
      <div class="card-body">
        <span class="tag-label">${p.category}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="byline">${escapeHtml(p.student)}</p>
        <p class="description">${escapeHtml(p.description)}</p>
      </div>
    `;
    card.addEventListener("click", () => openDetail(p));
    grid.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  render();
});

// ---- Detail modal ----
const detailBackdrop = document.getElementById("detailBackdrop");
const detailVideo = document.getElementById("detailVideo");
const detailTitle = document.getElementById("detailTitle");
const detailStudent = document.getElementById("detailStudent");
const detailDescription = document.getElementById("detailDescription");
const detailCategory = document.getElementById("detailCategory");

function openDetail(p) {
  detailVideo.src = p.video;
  detailTitle.textContent = p.title;
  detailStudent.textContent = p.student;
  detailDescription.textContent = p.description;
  detailCategory.textContent = p.category;
  detailBackdrop.classList.add("open");
}

document.getElementById("closeDetailBtn").addEventListener("click", () => {
  detailBackdrop.classList.remove("open");
  detailVideo.pause();
  detailVideo.removeAttribute("src");
});
detailBackdrop.addEventListener("click", (e) => {
  if (e.target === detailBackdrop) {
    detailBackdrop.classList.remove("open");
    detailVideo.pause();
    detailVideo.removeAttribute("src");
  }
});

// ---- Upload modal ----
const modalBackdrop = document.getElementById("modalBackdrop");
document.getElementById("openUploadBtn").addEventListener("click", () => modalBackdrop.classList.add("open"));
document.getElementById("closeUploadBtn").addEventListener("click", () => modalBackdrop.classList.remove("open"));
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
});

document.getElementById("uploadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const file = form.video.files[0];
  if (!file) return;

  const newProject = {
    title: form.title.value.trim(),
    student: form.student.value.trim(),
    category: form.category.value,
    description: form.description.value.trim(),
    video: URL.createObjectURL(file), // session-only preview; swap for a real upload endpoint to persist
  };

  projects.unshift(newProject);
  form.reset();
  modalBackdrop.classList.remove("open");

  // Jump to "All" so the new exhibit is visible regardless of current filter
  tabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tabs.querySelector('[data-category="all"]').classList.add("active");
  activeCategory = "all";
  render();
});

render();
