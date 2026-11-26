"use strict";

const articleList = document.getElementById("articles");
const blogList = document.getElementById("blog-list");
const blogDetail = document.getElementById("blog-detail");
const articleContent = document.getElementById("article-content");

// 記事一覧を表示
function showArticleList() {
  articleList.innerHTML = "";

  posts.forEach((post, index) => {
    const card = document.createElement("a");
    card.href = `?post=${index}`;
    card.className = "article-card";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const meta = document.createElement("p");
    meta.className = "article-meta";
    meta.textContent = `${post.date} / ${post.category}`;

    const description = document.createElement("p");
    description.textContent = post.description;

    card.append(meta, title, description);
    articleList.appendChild(card);
  });
}

// Markdown記事を表示
async function showArticle(index) {
  const post = posts[index];

  if (!post) {
    articleContent.textContent = "記事が見つかりません。";
    blogList.hidden = true;
    blogDetail.hidden = false;
    return;
  }

  try {
    const response = await fetch(`../posts/${post.file}`);

    if (!response.ok) {
      throw new Error("記事を読み込めませんでした。");
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);

    // 記事タイトル・日付・カテゴリは投稿データから表示する
    const articleMeta = document.getElementById("article-meta");
    if (articleMeta) {
      articleMeta.replaceChildren();

      const title = document.createElement("h1");
      title.textContent = post.title;

      const details = document.createElement("p");
      details.className = "article-meta";
      details.textContent = `${post.date} / ${post.category}`;

      articleMeta.append(title, details);
    }

    articleContent.innerHTML = DOMPurify.sanitize(html);

    blogList.hidden = true;
    blogDetail.hidden = false;

    document.title = `${post.title} | Blog`;
  } catch (error) {
    articleContent.textContent = "記事の読み込みに失敗しました。";
    blogList.hidden = true;
    blogDetail.hidden = false;
    console.error(error);
  }
}

// ブログページの処理
if (articleList && blogList && blogDetail && articleContent) {
  // 一覧に戻る
  const backButton = document.getElementById("back-to-list");

  if (backButton) {
    backButton.addEventListener("click", () => {
      location.href = "blog.html";
    });
  }

  // URLの ?post=番号 を確認
  const params = new URLSearchParams(location.search);
  const postIndex = params.get("post");

  if (postIndex !== null && /^\d+$/.test(postIndex)) {
    showArticle(Number(postIndex));
  } else {
    showArticleList();
  }
}

// トップページ：最近の投稿
const recentPostsContainer = document.getElementById("recent-posts");

if (recentPostsContainer) {
  const recentPosts = posts
    .map((post, index) => ({ ...post, index }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  recentPosts.forEach((post) => {
    const article = document.createElement("a");
    article.className = "recent-post-card";
    article.href = `pages/blog.html?post=${post.index}`;

    const meta = document.createElement("div");
    meta.className = "recent-post-meta";

    const date = document.createElement("time");
    date.textContent = post.date;

    const category = document.createElement("span");
    category.textContent = post.category;

    meta.append(date, category);

    const title = document.createElement("h3");
    title.textContent = post.title;

    const description = document.createElement("p");
    description.textContent = post.description;

    article.append(meta, title, description);
    recentPostsContainer.appendChild(article);
  });
}
