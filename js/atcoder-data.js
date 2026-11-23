"use strict";

const atcoderData = {
  username: "your_username",

  // 基本情報
  profile: {
    currentRating: null,
    highestRating: null,
    rank: "",
    contests: null,
  },

  // レート推移
  // 新しいコンテストを参加するたびに追加
  ratingHistory: [
    // { contest: "ABC 001", date: "2026-01-01", rating: 100 }
  ],

  // 得意分野・活動内容
  specialties: ["アルゴリズム", "データ構造"],

  introduction:
    "競技プログラミングを通して、アルゴリズムやデータ構造について学習しています。",
};
