"use strict";

const accountList = document.getElementById("x-account-list");

if (accountList) {
  xAccounts.forEach((account) => {
    const card = document.createElement("article");
    card.className = "x-account-card";

    // プロフィール画像
    const avatar = document.createElement("img");
    avatar.className = "x-account-avatar";
    avatar.src = account.icon;
    avatar.alt = `${account.name}のプロフィール画像`;
    avatar.loading = "lazy";

    // 画像が読み込めない場合
    avatar.onerror = () => {
      avatar.style.display = "none";
    };

    // プロフィール情報
    const info = document.createElement("div");
    info.className = "x-account-info";

    const name = document.createElement("a");
    name.className = "x-account-name";
    name.href = account.url;
    name.target = "_blank";
    name.rel = "noopener noreferrer";
    name.textContent = account.name;

    const username = document.createElement("div");
    username.className = "x-account-username";
    username.textContent = `@${account.username}`;

    const description = document.createElement("p");
    description.className = "x-account-description";
    description.textContent = account.description;

    info.append(name, username, description);

    // プロフィールへのリンク
    const button = document.createElement("a");
    button.className = "x-account-button";
    button.href = account.url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.textContent = "プロフィール";

    card.append(avatar, info, button);
    accountList.appendChild(card);
  });
}
