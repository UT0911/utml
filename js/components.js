// components.js の場所からプロジェクトのルートを取得
const componentScript = document.currentScript;
const projectRoot = new URL("../", componentScript.src);

// HTMLパーツの読み込み
async function loadComponent(id, file) {
  const target = document.getElementById(id);

  if (!target) {
    console.error(`読み込み先がありません: #${id}`);
    return;
  }

  const response = await fetch(new URL(file, projectRoot));

  if (!response.ok) {
    throw new Error(`${file} の読み込みに失敗しました: ${response.status}`);
  }

  target.innerHTML = await response.text();
}

// ヘッダーのリンク設定
function setHeaderLinks() {
  document.querySelectorAll("[data-page]").forEach((link) => {
    link.href = new URL(link.dataset.page, projectRoot).href;
  });
}

// 現在のページを強調表示
function setCurrentPage() {
  let currentPath = location.pathname;

  if (currentPath.endsWith("/")) {
    currentPath += "index.html";
  }

  document.querySelectorAll(".nav a").forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    let active = currentPath === linkPath;

    // AtCoder詳細ページではACCOUNTSを強調
    if (
      currentPath.includes("/accounts/") &&
      link.dataset.page === "accounts.html"
    ) {
      active = true;
    }

    link.classList.toggle("active", active);
  });
}

// ハンバーガーメニュー
function setupMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!button || !nav) {
    console.error("メニューボタンまたはナビゲーションが見つかりません");
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く",
    );
  });

  // リンクを押したら閉じる
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "メニューを開く");
    });
  });

  // Escapeキーで閉じる
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "メニューを開く");
    }
  });
}

// 共通パーツの読み込み
async function loadCommonParts() {
  try {
    await Promise.all([
      loadComponent("header", "components/header.html"),
      loadComponent("footer", "components/footer.html"),
    ]);

    setHeaderLinks();
    setCurrentPage();
    setupMobileMenu();

    // テーマ切り替えの初期化
    if (typeof initializeTheme === "function") {
      initializeTheme();
    }

    console.log("ヘッダー・フッターの読み込み完了");
  } catch (error) {
    console.error("共通パーツの読み込みに失敗しました:", error);
  }
}

loadCommonParts();
