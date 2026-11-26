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

  // 記事を開いたときは、ブログ一覧ページの説明部分を隠す
  const pageHeading = document.querySelector(".blog-container > .page-heading");
  if (pageHeading) {
    pageHeading.hidden = true;
  }

  try {
    const response = await fetch(`../posts/${post.file}`);

    if (!response.ok) {
      throw new Error("記事を読み込めませんでした。");
    }

    const markdown = await response.text();
    // [TOC] の位置に、記事内の h2・h3 見出しから目次を生成する
    const html = marked.parse(
      markdown.replace(/^\[TOC\]\s*$/m, "BLOG_TOC_PLACEHOLDER_7F3A"),
    );

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

    // fenced code blocks (```) にシンタックスハイライトを適用
    if (window.hljs) {
      articleContent.querySelectorAll("pre code").forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }

    // 画像パスは posts/<Markdownファイル名>/ を基準にする
    const postFolder = post.file.replace(/\.md$/i, "");
    articleContent.querySelectorAll("img").forEach((image) => {
      const source = image.getAttribute("src");
      if (!source) return;

      // 外部URL・サイト内絶対パス・ページ内リンクは変更しない
      if (/^(?:https?:)?\/\//i.test(source) || source.startsWith("/") || source.startsWith("#")) {
        return;
      }

      const relativePath = source.replace(/^\.\//, "");
      const pathParts = relativePath.split("/");
      if (pathParts.some((part) => part === ".." || part === "")) {
        image.removeAttribute("src");
        return;
      }

      image.src = `../posts/${postFolder}/${relativePath}`;

      // 画像を中央に配置し、alt属性の説明文を下に表示する
      const figure = document.createElement("figure");
      figure.className = "article-image";

      const parent = image.parentElement;
      if (parent && parent.tagName === "P" && parent.childElementCount === 1 && parent.textContent.trim() === "") {
        parent.replaceWith(figure);
      } else {
        image.replaceWith(figure);
      }

      figure.appendChild(image);

      if (image.alt.trim()) {
        const caption = document.createElement("figcaption");
        caption.textContent = image.alt;
        figure.appendChild(caption);
      }
    });

    // 目次の生成
    const tocPlaceholder = [...articleContent.querySelectorAll("p")].find(
      (element) => element.textContent.trim() === "BLOG_TOC_PLACEHOLDER_7F3A",
    );
    if (tocPlaceholder) {
      const headings = [...articleContent.querySelectorAll("h2, h3")];

      if (headings.length > 0) {
        const toc = document.createElement("nav");
        toc.className = "article-toc";
        toc.setAttribute("aria-label", "目次");

        const tocTitle = document.createElement("p");
        tocTitle.className = "article-toc-title";
        tocTitle.textContent = "目次";

        const tocList = document.createElement("ul");
        tocList.className = "article-toc-list";

        headings.forEach((heading, headingIndex) => {
          const id = `article-heading-${headingIndex + 1}`;
          heading.id = id;

          const item = document.createElement("li");
          item.className =
            heading.tagName.toLowerCase() === "h3"
              ? "article-toc-subitem"
              : "article-toc-item";

          const link = document.createElement("a");
          link.href = `#${id}`;
          link.textContent = heading.textContent;

          item.appendChild(link);
          tocList.appendChild(item);
        });

        toc.append(tocTitle, tocList);
        tocPlaceholder.replaceWith(toc);
      } else {
        tocPlaceholder.remove();
      }
    }

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
