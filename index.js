import "./style.css";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const input = document.querySelector(".filter");
const list = document.querySelector(".list_posts");
const loader = document.querySelector(".loader");

let page = 1;
const limitPerPage = 5;
const posts = [];
let isLoading = false;
let scroll = true;

document.addEventListener("scroll", onScroll);
input.addEventListener("input", onInput);

function onAutoScroll() {
  scroll = true;
}

function offAutoScroll() {
  scroll = false;
}

async function fetchPosts(page) {
  try {
    const resp = await fetch(
      `${BASE_URL}?_limit=${limitPerPage}&_page=${page}`
    );
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
}

async function loadPosts() {
  try {
    const resp = await fetchPosts(page);
    posts.push(...resp);
    createMarkupList(resp);
    page++;
  } catch (error) {
    console.log(error);
  }
}

function createMarkupList(data) {
  const markup = data
    .map(({ id, title, body }) => {
      return `<li class="list_item"><span class="span">${id}</span><h2>${title}</h2><p>${body}</p></li>`;
    })
    .join("");
  list.insertAdjacentHTML("beforeend", markup);
}

loadPosts();

function onScroll() {
  if (
    scroll &&
    !isLoading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    isLoading = true;
    loader.style.display = "block";

    setTimeout(() => {
      loadPosts().then(() => {
        isLoading = false;
        loader.style.display = "none";
      });
    }, 1000);
  }
}

function filterPosts(keyword) {
  const filteredPosts = posts.filter((post) => {
    const titleKeyword = post.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const bodyKeyword = post.body.toLowerCase().includes(keyword.toLowerCase());
    return titleKeyword || bodyKeyword;
  });

  list.innerHTML = "";
  createMarkupList(filteredPosts);
}

function onInput() {
  const keyword = input.value;
  if (keyword.trim() === "") {
    list.innerHTML = "";
    createMarkupList(posts);
    onAutoScroll();
  } else {
    filterPosts(keyword);
    offAutoScroll();
  }
}
