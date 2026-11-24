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
    if (`${account.username}` != "") {
      username.textContent = `@${account.username}`;
    }

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
