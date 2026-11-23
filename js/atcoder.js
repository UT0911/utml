// プロフィール情報
const profile = atcoderData.profile;

document.getElementById("atcoder-username").textContent =
  `@${atcoderData.username}`;

const profileLink = document.getElementById("atcoder-profile-link");
profileLink.href = `https://atcoder.jp/users/${encodeURIComponent(atcoderData.username)}`;

document.getElementById("current-rating").textContent =
  profile.currentRating ?? "-";

document.getElementById("highest-rating").textContent =
  profile.highestRating ?? "-";

document.getElementById("atcoder-rank").textContent = profile.rank || "-";

document.getElementById("contest-count").textContent = profile.contests ?? "-";

// 自己紹介
document.getElementById("atcoder-introduction").textContent =
  atcoderData.introduction;

// 得意分野
const specialtyList = document.getElementById("atcoder-specialties");

atcoderData.specialties.forEach((specialty) => {
  const tag = document.createElement("span");
  tag.className = "specialty-tag";
  tag.textContent = specialty;
  specialtyList.appendChild(tag);
});

// コンテスト履歴
const history = [...atcoderData.ratingHistory].sort((a, b) =>
  b.date.localeCompare(a.date),
);

const historyBody = document.getElementById("contest-history");

history.forEach((item) => {
  const tr = document.createElement("tr");

  [item.contest, item.date, item.rating].forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  });

  historyBody.appendChild(tr);
});

// レート推移グラフ
function drawRatingChart() {
  const svg = document.getElementById("rating-chart");
  const empty = document.getElementById("chart-empty");

  const data = [...atcoderData.ratingHistory].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  if (data.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  const width = 700;
  const height = 240;
  const padding = 25;

  const ratings = data.map((item) => item.rating);
  const min = Math.min(0, ...ratings);
  const max = Math.max(400, ...ratings);

  const points = data.map((item, index) => {
    const x =
      data.length === 1
        ? width / 2
        : padding + (index * (width - padding * 2)) / (data.length - 1);

    const y =
      height -
      padding -
      ((item.rating - min) / (max - min)) * (height - padding * 2);

    return `${x},${y}`;
  });

  const line = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );

  line.setAttribute("points", points.join(" "));
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", "#8AD8E4");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("stroke-linejoin", "round");

  svg.appendChild(line);

  data.forEach((item, index) => {
    const [x, y] = points[index].split(",").map(Number);

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "4");
    circle.setAttribute("fill", "#8AD8E4");

    svg.appendChild(circle);
  });
}

drawRatingChart();
