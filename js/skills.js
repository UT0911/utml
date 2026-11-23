"use strict";

// スキルデータ
const skills = [
  {
    name: "C++",
    icon: "https://cdn.simpleicons.org/cplusplus",
    description:
      "競技プログラミングを通して、アルゴリズムやデータ構造を学習しています。",
  },
  {
    name: "Java",
    icon: "https://cdn.simpleicons.org/java",
    description:
      "クラスやオブジェクト指向プログラミングについて学習しています。",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript",
    description:
      "Webサイトの動的な機能や、ビジュアライザの開発に使用しています。",
  },
  {
    name: "HTML",
    icon: "https://cdn.simpleicons.org/html5",
    description: "Webページの構造を作成するために使用しています。",
  },
  {
    name: "CSS",
    icon: "https://cdn.simpleicons.org/css",
    description: "Webページのレイアウトやデザインの実装に使用しています。",
  },
];

// スキルカードを作成
function createSkillCard(skill) {
  const card = document.createElement("article");
  card.className = "skill-detail-card";

  const iconArea = document.createElement("div");
  iconArea.className = "skill-icon";

  const img = document.createElement("img");
  img.src = skill.icon;
  img.alt = `${skill.name} icon`;

  iconArea.appendChild(img);

  const info = document.createElement("div");
  info.className = "skill-info";

  const title = document.createElement("h2");
  title.textContent = skill.name;

  const description = document.createElement("p");
  description.textContent = skill.description;

  info.append(title, description);
  card.append(iconArea, info);

  return card;
}

// スキル一覧を表示
function displaySkills() {
  const target = document.querySelector(".skill-detail-list");

  if (!target) return;

  skills.forEach((skill) => {
    target.appendChild(createSkillCard(skill));
  });
}

// HOME用のスキル一覧を表示
function displayHomeSkills() {
  const target = document.querySelector(".skill-list");

  if (!target) return;

  // 最初の3件だけ表示
  skills.slice(0, 3).forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.textContent = skill.name;

    target.appendChild(card);
  });
}

// ページに応じて表示
displaySkills();
displayHomeSkills();
