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

// 一覧に戻る
document.getElementById("back-to-list").addEventListener("click", () => {
  location.href = "blog.html";
});

// URLの ?post=番号 を確認
const params = new URLSearchParams(location.search);
const postIndex = params.get("post");

if (postIndex !== null && /^\d+$/.test(postIndex)) {
  showArticle(Number(postIndex));
} else {
  showArticleList();
}
