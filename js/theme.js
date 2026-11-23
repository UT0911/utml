"use strict";

function initializeTheme() {
  const button = document.getElementById("theme-toggle");

  // 保存されているテーマを取得
  const savedTheme = localStorage.getItem("theme");

  // 保存がなければダークモード
  const initialTheme = savedTheme || "dark";

  applyTheme(initialTheme);

  if (!button) return;

  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const button = document.getElementById("theme-toggle");

  if (button) {
    button.textContent = theme === "dark" ? "☀" : "☾";
    button.setAttribute(
      "aria-label",
      theme === "dark"
        ? "ライトモードに切り替える"
        : "ダークモードに切り替える",
    );
  }
}
