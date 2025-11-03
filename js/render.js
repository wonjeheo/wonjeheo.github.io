// === render.js ===
// CV 섹션별 JSON 데이터 불러와서 자동 렌더링

async function loadData() {
  try {
    const [pubsRes, honorsRes, eduRes, travelsRes] = await Promise.all([
      fetch("data/publications.json"),
      fetch("data/honors.json"),
      fetch("data/education.json"),
      fetch("data/travels.json")
    ]);

    const [pubs, honors, edu, travels] = await Promise.all([
      pubsRes.json(),
      honorsRes.json(),
      eduRes.json(),
      travelsRes.json()
    ]);

    renderPublications(pubs);
    renderHonors(honors);
    renderEducation(edu);
    renderTravelMap(travels);
  } catch (err) {
    console.error("🚨 Error loading data:", err);
  }
}

/* ---------- 📚 Publications ---------- */
function formatAuthors(p) {
  return p.authors.map((a, i) => {
    let mark = "";

    // ① 단독 1저자
    if (p.first_author && i === 0 && !p.equal_contribution_indices)
      mark = "<sup>1</sup>";

    // ② 공동 1저자 (equal_contribution_indices 배열 기반)
    if (p.equal_contribution_indices && p.equal_contribution_indices.includes(i))
      mark = "<sup>†</sup>";

    // ③ 교신저자
    if (p.corresponding_author_index === i)
      mark += "<sup>*</sup>";

    // ④ 네 이름 밑줄 처리
    const underlined = /Heo/i.test(a) || /Wonje/i.test(a) || /허\s*원제/.test(a)
      ? `<u>${a}</u>`
      : a;

    return underlined + mark;
  }).join(", ");
}


function renderPublications(pubs) {
  const section = document.querySelector("#publication");
  let html = `
    <h2>Publications</h2>
    <div class="pub-category">
      <h3>International</h3>
      <ul class="pub-list">
        ${pubs.international
          .sort((a, b) => b.year - a.year)
          .map((p) => {
            const authorsHTML = formatAuthors(p);
            return `
              <li>
                ${authorsHTML}.  
                “<strong>${p.title}</strong>,” 
                <em>${p.journal}</em>${p.volume ? `, vol. ${p.volume}` : ""}${p.pages ? `, pp. ${p.pages}` : ""}, 
                ${p.year}. 
                ${p.doi ? `<a href="${p.doi}" target="_blank">📄 DOI</a>` : ""}
              </li>
            `;
          })
          .join("")}
      </ul>
    </div>

    <div class="pub-category">
      <h3>Domestic</h3>
      <ul class="pub-list">
        ${pubs.domestic
          .sort((a, b) => b.year - a.year)
          .map((p) => {
            const authorsHTML = formatAuthors(p);
            return `
              <li>
                ${authorsHTML}.  
                “<strong>${p.title}</strong>,”  
                <em>${p.conference}</em>${p.pages ? `, pp. ${p.pages}` : ""}, ${p.year}.
              </li>
            `;
          })
          .join("")}
      </ul>
    </div>

    <p style="font-size:0.9em; color:#94a3b8; margin-top:20px;">
      <sup>1</sup> First author <sup>†</sup> Equal contribution <sup>*</sup> Corresponding author
    </p>
  `;

  section.innerHTML = html;
}

/* ---------- 🏅 Honors & Awards ---------- */
function renderHonors(honors) {
  const section = document.querySelector("#honors");
  let html = `
    <h2>Honors & Awards</h2>
    <ul class="award-list">
      ${honors
        .sort((a, b) => b.year - a.year)
        .map((h) => `<li>${h.year} <strong>${h.title}</strong> — ${h.organization}</li>`)
        .join("")}
    </ul>
  `;
  section.innerHTML = html;
}

/* ---------- 🎓 Education ---------- */
function renderEducation(edu) {
  const section = document.querySelector("#education");
  let html = `
    <h2>Education</h2>
    ${edu
      .map(
        (e) => `
      <div class="edu-item">
        <div class="edu-text">
          <h3>${e.school}</h3>
          <p>${e.degree}</p>
        </div>
        <div class="edu-logo">
          <img src="${e.logo}" alt="${e.school}" />
        </div>
      </div>
    `
      )
      .join("")}
  `;
  section.innerHTML = html;
}

/* ---------- 🌍 Travel Map ---------- */
function renderTravelMap(travels) {
  const map = L.map("travel-map", {
    center: [20, 0],
    zoom: 2,
    worldCopyJump: true
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  travels.forEach((loc) => {
    L.circleMarker(loc.coord, {
      radius: 6,
      color: "#38bdf8",
      fillColor: "#38bdf8",
      fillOpacity: 0.8
    })
      .addTo(map)
      .bindPopup(`<b>${loc.city}</b>`);
  });
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", loadData);
