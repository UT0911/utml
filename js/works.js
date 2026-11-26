// 作品カードを作成
function createWorkCard(work, index) {
  const card = document.createElement("article");
  card.className = "glass-card work-card";

  const image = document.createElement("div");
  image.className = `work-image work-image-${(index % 3) + 1}`;

  const imageLabel = document.createElement("span");
  imageLabel.textContent = `PROJECT ${String(index + 1).padStart(2, "0")}`;
  image.appendChild(imageLabel);

  const info = document.createElement("div");
  info.className = "work-info";

  const category = document.createElement("p");
  category.className = "eyebrow";
  category.textContent = work.category;

  const title = document.createElement("h3");
  title.textContent = work.title;

  const description = document.createElement("p");
  description.textContent = work.description;

  const tags = document.createElement("div");
  tags.className = "work-tags";

  (work.technologies || []).forEach((technology) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = technology;
    tags.appendChild(tag);
  });

  info.append(category, title, description, tags);

  if (work.url) {
    const link = document.createElement("a");
    link.className = "text-link";
    link.href = work.url;
    link.textContent = "VIEW PROJECT →";

    if (/^https?:\/\//i.test(work.url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    info.appendChild(link);
  }

  card.append(image, info);
  return card;
}

// 作品一覧・HOMEのおすすめ作品を表示
function displayWorks() {
  const allWorksTarget = document.querySelector("#works-list");
  const featuredWorksTarget = document.querySelector("#featured-works");

  if (allWorksTarget) {
    works.forEach((work, index) => {
      allWorksTarget.appendChild(createWorkCard(work, index));
    });
  }

  if (featuredWorksTarget) {
    works
      .filter((work) => work.featured)
      .slice(0, 2)
      .forEach((work) => {
        const index = works.indexOf(work);
        featuredWorksTarget.appendChild(createWorkCard(work, index));
      });
  }
}

displayWorks();
