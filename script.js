
const projects = [
  {
    title: "Respiratory System Model",
    student: "Ashma, Divya, Shivika — Grade 7",
    category: "Science",
    description: "A model of the human respiratory system built from everyday materials. Demonstrates how air flows through the lungs and how the diaphragm assists in breathing.",
    video: "/videos/respiratory%20system.mp4"
  },
  {
    title: "Hemodialysis",
    student: "Angel, Vidushi — Grade 9",
    category: "Science",
    description: "Hemodialysis uses a machine and a special filter called an artificial kidney to clean toxins, waste products and excess fluids from the blood.",
    video: "/videos/hemodialysis.mp4"
  },
  {
    title: "Water Cycle Model",
    student: "Shorya, Divyanshu — Grade 7",
    category: "Science",
    description: "A model demonstrating evaporation, condensation and precipitation.",
    video: "/videos/water%20cycle.mp4"
  },
  {
    title: "Acid Rain",
    student: "Shagun, Mahi, Pari, Yashvi — Grade 8",
    category: "Science",
    description: "A model demonstrating the effects of acid rain on plants and aquatic ecosystems.",
    video: "/videos/acidrain.mp4"
  },
  {
    title: "Water Dam Model",
    student: "Anubhav, Ashfahad, Harsh, Shubh, Vansh — Grade 9",
    category: "Science",
    description: "A model demonstrating the effects of water dams on the environment.",
    video: "/videos/water%20dam.mp4"
  },
  {
    title: "Day and Night Model",
    student: "Shadan — Grade 6",
    category: "Science",
    description: "A model demonstrating how Earth's rotation creates day and night.",
    video: "/videos/dayandnight.mp4"
  },
  {
    title: "Sources of Indian History and Volcano",
    student: "Aditi, Divya, Ashma, Shivika — Grade 7",
    category: "S.studies",
    description: "A model demonstrating sources of Indian history, including archaeological findings and historical texts.",
    video: "/videos/indian%20history.mp4"
  }
];

// DOM ELEMENTS

const grid = document.getElementById("projectGrid");
const tabs = document.getElementById("categoryTabs");

let activeCategory = "all";

// HTML ESCAPE

function escapeHtml(value = "") {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

// VIDEO URL

function getVideoUrl(path) {
  return new URL(path, window.location.origin).href;
}

// RENDER PROJECTS

function render() {
  grid.innerHTML = "";

  const visibleProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  visibleProjects.forEach((p, i) => {

    const card = document.createElement("article");
    card.className = "card";

    card.style.setProperty(
      "--tilt",
      i % 2 === 0 ? "-0.6deg" : "0.6deg"
    );

    const video = document.createElement("video");

    video.src = getVideoUrl(p.video);
    video.muted = true;
    video.preload = "metadata";
    video.playsInline = true;

    video.addEventListener("error", () => {
      console.error("VIDEO ERROR:", video.currentSrc);
      console.error("Error details:", video.error);

      video.poster = "";
    });

    const body = document.createElement("div");
    body.className = "card-body";

    body.innerHTML = `
      <span class="tag-label">${escapeHtml(p.category)}</span>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="byline">${escapeHtml(p.student)}</p>
      <p class="description">${escapeHtml(p.description)}</p>
    `;

    card.appendChild(video);
    card.appendChild(body);

    card.addEventListener("click", () => openDetail(p));

    grid.appendChild(card);
  });
}

// CATEGORY FILTER

tabs.addEventListener("click", (e) => {

  const btn = e.target.closest(".tab");

  if (!btn) return;

  tabs.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
  });

  btn.classList.add("active");

  activeCategory = btn.dataset.category;

  render();
});

// DETAIL MODAL

const detailBackdrop = document.getElementById("detailBackdrop");
const detailVideo = document.getElementById("detailVideo");

const detailTitle = document.getElementById("detailTitle");
const detailStudent = document.getElementById("detailStudent");
const detailDescription = document.getElementById("detailDescription");
const detailCategory = document.getElementById("detailCategory");

function openDetail(p) {

  detailVideo.pause();

  detailVideo.src = getVideoUrl(p.video);
  detailVideo.load();

  detailTitle.textContent = p.title;
  detailStudent.textContent = p.student;
  detailDescription.textContent = p.description;
  detailCategory.textContent = p.category;

  detailBackdrop.classList.add("open");
}

function closeDetail() {

  detailBackdrop.classList.remove("open");

  detailVideo.pause();
  detailVideo.removeAttribute("src");
  detailVideo.load();
}

document.getElementById("closeDetailBtn")
  .addEventListener("click", closeDetail);

detailBackdrop.addEventListener("click", e => {

  if (e.target === detailBackdrop) {
    closeDetail();
  }
});

// UPLOAD MODAL

const modalBackdrop = document.getElementById("modalBackdrop");

document.getElementById("openUploadBtn")
  .addEventListener("click", () => {
    modalBackdrop.classList.add("open");
  });

document.getElementById("closeUploadBtn")
  .addEventListener("click", () => {
    modalBackdrop.classList.remove("open");
  });

modalBackdrop.addEventListener("click", e => {

  if (e.target === modalBackdrop) {
    modalBackdrop.classList.remove("open");
  }
});

// TEMPORARY VIDEO UPLOAD PREVIEW

document.getElementById("uploadForm")
  .addEventListener("submit", e => {

    e.preventDefault();

    const form = e.target;
    const file = form.elements.video.files[0];

    if (!file) {
      alert("Please select a video.");
      return;
    }

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video.");
      return;
    }

    const temporaryUrl = URL.createObjectURL(file);

    const newProject = {
      title: form.elements.title.value.trim(),
      student: form.elements.student.value.trim(),
      category: form.elements.category.value,
      description: form.elements.description.value.trim(),
      video: temporaryUrl
    };

    projects.unshift(newProject);

    form.reset();

    modalBackdrop.classList.remove("open");

    tabs.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("active");
    });

    const allTab = tabs.querySelector('[data-category="all"]');

    if (allTab) {
      allTab.classList.add("active");
    }

    activeCategory = "all";

    render();
  });

// INITIALIZE

render();
