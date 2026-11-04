
// ==========================================
// MPS GLOBAL SCHOOL - PROJECT SHOWCASE
// ==========================================

// All videos are stored in the ROOT directory
// alongside index.html, not inside a videos folder.

const projects = [
  {
    title: "Respiratory System Model",
    student: "Ashma, Divya, Shivika — Grade 7",
    category: "Science",
    description: "A model of the human respiratory system built from everyday materials. Demonstrates how air flows through the lungs and how the diaphragm assists in breathing.",
    video: "/respiratory%20system.mp4"
  },
  {
    title: "Hemodialysis",
    student: "Angel, Vidushi — Grade 9",
    category: "Science",
    description: "Hemodialysis is a medical procedure that uses a machine and a special filter called an artificial kidney to clean toxins, waste products, and excess fluids from the blood.",
    video: "/hemodialysis.mp4"
  },
  {
    title: "Water Cycle Model",
    student: "Shorya, Divyanshu — Grade 7",
    category: "Science",
    description: "A model demonstrating the water cycle, including evaporation, condensation, and precipitation.",
    video: "/water%20cycle.mp4"
  },
  {
    title: "Acid Rain",
    student: "Shagun, Mahi, Pari, Yashvi — Grade 8",
    category: "Science",
    description: "A model demonstrating the effects of acid rain on the environment, including its impact on plants and aquatic ecosystems.",
    video: "/acidrain.mp4"
  },
  {
    title: "Water Dam Model",
    student: "Anubhav, Ashfahad, Harsh, Shubh, Vansh — Grade 9",
    category: "Science",
    description: "A model demonstrating the effects of water dams on the environment and local ecosystems.",
    video: "/water%20dam.mp4"
  },
  {
    title: "Day and Night Model",
    student: "Shadan — Grade 6",
    category: "Science",
    description: "A model demonstrating how Earth's rotation creates the cycle of day and night.",
    video: "/dayandnight.mp4"
  },
  {
    title: "Sources of Indian History and Volcano",
    student: "Aditi, Divya, Ashma, Shivika — Grade 7",
    category: "S.studies",
    description: "A model demonstrating the sources of Indian history, including archaeological findings and historical texts.",
    video: "/indian%20history.mp4"
  }
];

// ==========================================
// DOM ELEMENTS
// ==========================================

const grid = document.getElementById("projectGrid");
const tabs = document.getElementById("categoryTabs");

const detailBackdrop = document.getElementById("detailBackdrop");
const detailVideo = document.getElementById("detailVideo");

const detailTitle = document.getElementById("detailTitle");
const detailStudent = document.getElementById("detailStudent");
const detailDescription = document.getElementById("detailDescription");
const detailCategory = document.getElementById("detailCategory");

const modalBackdrop = document.getElementById("modalBackdrop");

const uploadForm = document.getElementById("uploadForm");

let activeCategory = "all";

// ==========================================
// SAFE TEXT
// ==========================================

function createTextElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  element.textContent = text;

  return element;
}

// ==========================================
// RENDER PROJECTS
// ==========================================

function render() {

  if (!grid) return;

  grid.innerHTML = "";

  const visibleProjects = activeCategory === "all"
    ? projects
    : projects.filter(project =>
        project.category === activeCategory
      );

  visibleProjects.forEach((project, index) => {

    const card = document.createElement("article");

    card.className = "card";

    card.style.setProperty(
      "--tilt",
      index % 2 === 0 ? "-0.6deg" : "0.6deg"
    );

    // Video preview

    const video = document.createElement("video");

    video.src = project.video;
    video.muted = true;
    video.preload = "metadata";
    video.playsInline = true;

    video.addEventListener("error", () => {
      console.error(
        "Video loading failed:",
        project.video,
        video.error
      );
    });

    // Card content

    const body = document.createElement("div");

    body.className = "card-body";

    body.appendChild(
      createTextElement(
        "span",
        "tag-label",
        project.category
      )
    );

    body.appendChild(
      createTextElement(
        "h3",
        "",
        project.title
      )
    );

    body.appendChild(
      createTextElement(
        "p",
        "byline",
        project.student
      )
    );

    body.appendChild(
      createTextElement(
        "p",
        "description",
        project.description
      )
    );

    card.appendChild(video);
    card.appendChild(body);

    card.addEventListener("click", () => {
      openDetail(project);
    });

    grid.appendChild(card);

  });

}

// ==========================================
// CATEGORY FILTERS
// ==========================================

tabs.addEventListener("click", (event) => {

  const button = event.target.closest(".tab");

  if (!button) return;

  tabs.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  button.classList.add("active");

  activeCategory = button.dataset.category;

  render();

});

// ==========================================
// DETAIL MODAL
// ==========================================

function openDetail(project) {

  detailVideo.pause();

  detailVideo.src = project.video;

  detailVideo.load();

  detailTitle.textContent = project.title;

  detailStudent.textContent = project.student;

  detailDescription.textContent = project.description;

  detailCategory.textContent = project.category;

  detailBackdrop.classList.add("open");

}

function closeDetail() {

  detailBackdrop.classList.remove("open");

  detailVideo.pause();

  detailVideo.removeAttribute("src");

  detailVideo.load();

}

document
  .getElementById("closeDetailBtn")
  .addEventListener("click", closeDetail);

detailBackdrop.addEventListener("click", event => {

  if (event.target === detailBackdrop) {
    closeDetail();
  }

});

// ==========================================
// UPLOAD MODAL
// ==========================================

document
  .getElementById("openUploadBtn")
  .addEventListener("click", () => {

    modalBackdrop.classList.add("open");

  });

document
  .getElementById("closeUploadBtn")
  .addEventListener("click", () => {

    modalBackdrop.classList.remove("open");

  });

modalBackdrop.addEventListener("click", event => {

  if (event.target === modalBackdrop) {
    modalBackdrop.classList.remove("open");
  }

});

// ==========================================
// ADD NEW PROJECT
// TEMPORARY BROWSER PREVIEW ONLY
// ==========================================

uploadForm.addEventListener("submit", event => {

  event.preventDefault();

  const form = event.target;

  const file = form.elements.video.files[0];

  if (!file) {
    alert("Please select a video.");
    return;
  }

  if (!file.type.startsWith("video/")) {
    alert("Please select a valid video file.");
    return;
  }

  const videoURL = URL.createObjectURL(file);

  let category = form.elements.category.value;

  // Compatibility with the original HTML option
  if (category === "Technology") {
    category = "S.studies";
  }

  const newProject = {

    title: form.elements.title.value.trim(),

    student: form.elements.student.value.trim(),

    category: category,

    description: form.elements.description.value.trim(),

    video: videoURL

  };

  projects.unshift(newProject);

  form.reset();

  modalBackdrop.classList.remove("open");

  // Activate All Exhibits

  tabs.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  const allTab = tabs.querySelector(
    '[data-category="all"]'
  );

  if (allTab) {
    allTab.classList.add("active");
  }

  activeCategory = "all";

  render();

  alert("Project added for this visit!");

});

// ==========================================
// INITIALIZE WEBSITE
// ==========================================

render();
