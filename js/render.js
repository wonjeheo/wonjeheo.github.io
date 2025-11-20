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

/* ---------- 📚 Publications (Updated) ---------- */
function formatAuthors(p) {
  return p.authors.map((a, i) => {
    let mark = "";

    // 단독 1저자
    if (p.first_author && i === 0 && !p.equal_contribution_indices)
      mark = "<sup>1</sup>";

    // 공동 1저자
    if (p.equal_contribution_indices && p.equal_contribution_indices.includes(i))
      mark = "<sup>†</sup>";

    // 교신저자
    if (p.corresponding_author_index === i)
      mark += "<sup>*</sup>";

    // 네 이름 밑줄
    const underlined =
      /Heo/i.test(a) || /Wonje/i.test(a) || /허\s*원제/.test(a)
        ? `<u>${a}</u>`
        : a;

    return underlined + mark;
  }).join(", ");
}

function renderPubCategory(title, list, type) {
  return `
    <div class="pub-category">
      <h3>${title}</h3>
      <ul class="pub-list">
        ${list
          .sort((a, b) => b.year - a.year)
          .map((p) => {
            const authorsHTML = formatAuthors(p);

            // 학회인지 저널인지 파싱
            const venue = p.journal
              ? `<em>${p.journal}</em>`
              : p.conference
              ? `<em>${p.conference}</em>`
              : "";

            // presentation 처리 (oral/poster)
            const presentation = p.presentation
              ? `<span style="color:#38bdf8; font-weight:bold;">[${p.presentation.toUpperCase()}]</span>`
              : "";

            // 페이지/볼륨
            const detail =
              p.volume
                ? `, vol. ${p.volume}`
                : "" +
                  (p.pages ? `, pp. ${p.pages}` : "");

            // DOI
            const doi = p.doi
              ? `<a href="${p.doi}" target="_blank">📄 DOI</a>`
              : "";

            return `
              <li>
                ${authorsHTML}.  
                “<strong>${p.title}</strong>,”  
                ${venue}${detail ? detail : ""}, ${p.year}.  
                ${presentation}  
                ${doi}
              </li>
            `;
          })
          .join("")}
      </ul>
    </div>
  `;
}

function renderPublications(pubs) {
  const section = document.querySelector("#publication");

  let html = `
    <h2>Publications</h2>

    ${renderPubCategory("International Journal", pubs.international_journal || [])}
    ${renderPubCategory("International Conference", pubs.international_conference || [])}
    ${renderPubCategory("Domestic", pubs.domestic || [])}

    <p style="font-size:0.9em; color:#94a3b8; margin-top:20px;">
      <sup>1</sup> First author 
      <sup>†</sup> Equal contribution 
      <sup>*</sup> Corresponding author
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
