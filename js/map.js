// 지도 객체 생성
const map = L.map('travel-map', {
  center: [20, 0],
  zoom: 2,
  worldCopyJump: true
});

// 타일 레이어
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 방문한 도시 목록
const visited = [
  // 🇰🇷 South Korea
  { city: "🇰🇷 Daegu, South Korea", coord: [35.8714, 128.6014] },

  // 🇯🇵 Japan
  { city: "🇯🇵 Osaka, Japan", coord: [34.6937, 135.5023] },
  { city: "🇯🇵 Tokyo, Japan", coord: [35.6895, 139.6917] },

  // 🇸🇬 Singapore
  { city: "🇸🇬 Singapore", coord: [1.3521, 103.8198] },

  // 🇹🇭 Thailand
  { city: "🇹🇭 Bangkok, Thailand", coord: [13.7563, 100.5018] },

  // 🇺🇸 United States
  { city: "🇺🇸 Berkeley, USA", coord: [37.8715, -122.2730] },
  { city: "🇺🇸 San Francisco, USA", coord: [37.7749, -122.4194] },
  { city: "🇺🇸 Los Angeles, USA", coord: [34.0522, -118.2437] },
  { city: "🇺🇸 New York, USA", coord: [40.7128, -74.0060] },
  { city: "🇺🇸 Washington D.C., USA", coord: [38.9072, -77.0369] },

  // 🇮🇹 Italy
  { city: "🇮🇹 Rome, Italy", coord: [41.9028, 12.4964] },
  { city: "🇮🇹 Venice, Italy", coord: [45.4408, 12.3155] },
  { city: "🇮🇹 Turin, Italy", coord: [45.0703, 7.6869] },
  { city: "🇮🇹 Milan, Italy", coord: [45.4642, 9.19] },
  { city: "🇮🇹 Pisa, Italy", coord: [43.7167, 10.4] },
  { city: "🇮🇹 Florence, Italy", coord: [43.7696, 11.2558] },
  { city: "🇮🇹 Sorrento, Italy", coord: [40.6263, 14.3758] },

  // 🇭🇺 Hungary
  { city: "🇭🇺 Budapest, Hungary", coord: [47.4979, 19.0402] },

  // 🇨🇿 Czech Republic
  { city: "🇨🇿 Prague, Czech Republic", coord: [50.0755, 14.4378] },

  // 🇦🇹 Austria
  { city: "🇦🇹 Vienna, Austria", coord: [48.2082, 16.3738] },
  { city: "🇦🇹 Salzburg, Austria", coord: [47.8095, 13.0550] },

  // 🇫🇷 France
  { city: "🇫🇷 Nice, France", coord: [43.7102, 7.2620] },

  // 🇵🇹 Portugal
  { city: "🇵🇹 Porto, Portugal", coord: [41.1579, -8.6291] },
  { city: "🇵🇹 Lisbon, Portugal", coord: [38.7169, -9.1399] },

  // 🇪🇸 Spain
  { city: "🇪🇸 Seville, Spain", coord: [37.3891, -5.9845] },
  { city: "🇪🇸 Malaga, Spain", coord: [36.7213, -4.4214] },
  { city: "🇪🇸 Granada, Spain", coord: [37.1773, -3.5986] },
  { city: "🇪🇸 Barcelona, Spain", coord: [41.3874, 2.1686] }
];

// 마커 추가
visited.forEach(loc => {
  L.circleMarker(loc.coord, {
    radius: 6,
    color: '#38bdf8',
    fillColor: '#38bdf8',
    fillOpacity: 0.8
  }).addTo(map).bindPopup(`<b>${loc.city}</b>`);
});