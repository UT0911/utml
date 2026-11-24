"use strict";

const ATCODER_USERNAME = "UT0911";

// レートに応じた色のクラス名
function getRatingClass(rating) {
  if (rating < 400) return "rating-gray";
  if (rating < 800) return "rating-brown";
  if (rating < 1200) return "rating-green";
  if (rating < 1600) return "rating-cyan";
  if (rating < 2000) return "rating-blue";
  if (rating < 2400) return "rating-yellow";
  if (rating < 2800) return "rating-orange";
  return "rating-red";
}

// レートを表示
function displayRating(element, rating) {
  if (!element) return;

  const ratingClasses = [
    "rating-gray",
    "rating-brown",
    "rating-green",
    "rating-cyan",
    "rating-blue",
    "rating-yellow",
    "rating-orange",
    "rating-red",
  ];

  element.classList.remove(...ratingClasses);

  element.textContent = rating;
  element.classList.add(getRatingClass(rating));
}

// 日付を表示
function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// レート履歴を取得
async function loadRating(type) {
  const prefix = type.toLowerCase();

  const status = document.getElementById(`${prefix}-status`);
  const stats = document.getElementById(`${prefix}-stats`);

  const currentElement = document.getElementById(`${prefix}-current`);

  const highestElement = document.getElementById(`${prefix}-highest`);

  const countElement = document.getElementById(`${prefix}-count`);

  const lastElement = document.getElementById(`${prefix}-last`);

  try {
    if (status) {
      status.textContent = "レートを取得中...";
    }

    let response;

    if (type === "Heuristic") {
      // HeuristicはGitHub Actionsが生成したJSONを使用
      const url = new URL("../data/heuristic-rating.json", document.baseURI);

      response = await fetch(url);
    } else {
      // Algorithmはkenkooooから取得
      const url =
        `https://kenkoooo.com/atcoder/proxy/users/` +
        `${ATCODER_USERNAME}/history/json`;

      response = await fetch(url);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const history = await response.json();

    if (!Array.isArray(history)) {
      throw new Error("取得したデータが配列ではありません。");
    }

    // Rated対象のコンテストだけ抽出
    const ratedHistory = history
      .filter((contest) => {
        return (
          contest.IsRated === true && typeof contest.NewRating === "number"
        );
      })
      .sort((a, b) => {
        return new Date(a.EndTime) - new Date(b.EndTime);
      });

    if (ratedHistory.length === 0) {
      throw new Error("レート履歴がありません。");
    }

    // 現在レート
    const currentRating = ratedHistory[ratedHistory.length - 1].NewRating;

    // 最高レート
    const highestRating = Math.max(
      ...ratedHistory.map((contest) => contest.NewRating),
    );

    // 最後に参加したコンテスト
    const lastContest = ratedHistory[ratedHistory.length - 1];

    // 表示
    displayRating(currentElement, currentRating);
    displayRating(highestElement, highestRating);

    if (countElement) {
      countElement.textContent = ratedHistory.length;
    }

    if (lastElement) {
      lastElement.textContent = formatDate(lastContest.EndTime);
    }

    if (stats) {
      stats.hidden = false;
    }

    if (status) {
      status.textContent = "取得しました";
    }
  } catch (error) {
    console.error(`${type} Rating Error:`, error);

    if (status) {
      status.textContent = "取得に失敗しました。";
    }

    if (stats) {
      stats.hidden = true;
    }
  }
}

// AlgorithmとHeuristicをそれぞれ取得
loadRating("Algorithm");
loadRating("Heuristic");
