// import { fetchPosts } from "./fetchPosts";

// const input = document.querySelector(".filter");
const list = document.querySelector(".list_posts");
const loadMoreBtn = document.querySelector(".load_more");
let page = 1;
let renderedPosts = 5;

loadMoreBtn.addEventListener("click", onLoadMoreBtn);

async function fetchPosts(page) {
  try {
    const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

    const resp = await fetch(`${BASE_URL}?_limit=5&_page=${page}`);
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
}

function createMarkupList(posts) {
  const markup = posts
    .map(({ id, title, body }) => {
      return `<li class="list_item"><span>${id}</span><h2>${title}</h2><p>${body}</p></li>`;
    })
    .join("");
  list.insertAdjacentHTML("beforeend", markup);
}

fetchPosts(page)
  .then((posts) => {
    console.log(posts);
    createMarkupList(posts);
  })
  .catch((error) => console.log(error));

async function onLoadMoreBtn() {
  try {
    page += 1;
    const response = await fetchPosts(page);
    renderedPosts += response.length;
    console.log(renderedPosts);
    if (renderedPosts === 100) {
      loadMoreBtn.style.display = "none";
    }
    createMarkupList(response);
    console.log(response);
    console.log(page);

    return;
  } catch (err) {
    console.log(err);
  }
}
