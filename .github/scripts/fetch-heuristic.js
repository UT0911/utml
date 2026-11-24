"use strict";

const USERNAME = "UT0911";
const OUTPUT_PATH = "data/heuristic-rating.json";

async function main() {
  const url = new URL(`https://atcoder.jp/users/${USERNAME}/history/json`);

  url.searchParams.set("contestType", "heuristic");

  console.log("Heuristic ratingを取得中...");
  console.log(url.toString());

  const response = await fetch(url, {
    headers: {
      "User-Agent": "UTML-AtCoder-Rating/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`AtCoder API Error: ${response.status}`);
  }

  const history = await response.json();

  if (!Array.isArray(history)) {
    throw new Error("取得したデータが配列ではありません。");
  }

  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  await fs.mkdir(path.dirname(OUTPUT_PATH), {
    recursive: true,
  });

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(history, null, 2), "utf8");

  console.log(`${history.length}件の履歴を保存しました。`);
}

main().catch((error) => {
  console.error("Heuristic Rating Error:", error);
  process.exit(1);
});
