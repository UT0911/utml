"use strict";

const accounts = [
  {
    name: "X",
    category: "SNS",
    username: "your_username",
    description: "日々の活動や近況を投稿",
    url: "https://x.com/your_username",
    detailPage: null,
    icon: "https://cdn.simpleicons.org/x/FFFFFF",
  },
  {
    name: "AtCoder",
    category: "Competitive Programming",
    username: "your_username",
    description: "競技プログラミングの活動記録",
    url: "https://atcoder.jp/users/your_username",
    detailPage: "accounts/atcoder.html",
    icon: "https://cdn.simpleicons.org/atcoder/FFFFFF",
  },
  {
    name: "yukicoder",
    category: "Competitive Programming",
    username: "your_id",
    description: "問題への取り組みや提出記録",
    url: "https://yukicoder.me/users/your_id",
    detailPage: null,
    icon: "https://cdn.simpleicons.org/yukicoder/FFFFFF",
  },
  {
    name: "GitHub",
    category: "Development",
    username: "your_username",
    description: "制作したプログラムやソースコード",
    url: "https://github.com/your_username",
    detailPage: null,
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    name: "Qiita",
    category: "Technical Articles",
    username: "your_username",
    description: "技術記事や学習記録",
    url: "https://qiita.com/your_username",
    detailPage: null,
    icon: "https://cdn.simpleicons.org/qiita/FFFFFF",
  },
  {
    name: "YouTube",
    category: "Video",
    username: "your_username",
    description: "動画・チャンネル",
    url: "https://www.youtube.com/@your_username",
    detailPage: null,
    icon: "https://cdn.simpleicons.org/youtube/FFFFFF",
  },
];

const categoryTargets = {
  SNS: "social-accounts",
  "Competitive Programming": "competitive-accounts",
  Development: "technical-accounts",
  "Technical Articles": "technical-accounts",
  Video: "video-accounts",
};

function displayAccounts() {
  accounts.forEach((account) => {
    const targetId = categoryTargets[account.category];
    const target = document.getElementById(targetId);

    if (!target) return;

    const card = document.createElement("a");
    card.className = "account-card";
    card.href = account.detailPage || account.url;

    if (!account.detailPage) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    // アイコン
    const icon = document.createElement("img");
    icon.className = "account-icon";
    icon.src = account.icon;
    icon.alt = `${account.name} icon`;

    // サービス名
    const title = document.createElement("h3");
    title.textContent = account.name;

    // ユーザー名
    const username = document.createElement("p");
    username.className = "account-username";
    username.textContent = `@${account.username}`;

    // 説明
    const description = document.createElement("p");
    description.textContent = account.description;

    // リンクテキスト
    const linkText = document.createElement("span");
    linkText.className = "account-link";
    linkText.textContent = account.detailPage ? "VIEW DETAILS →" : "VISIT →";

    card.append(icon, title, username, description, linkText);
    target.appendChild(card);
  });
}

displayAccounts();
