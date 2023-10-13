async function fetchPosts(page) {
  try {
    const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

    const resp = await fetch(`${BASE_URL}?_limit=5&_page=${page}`);
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
}

export { fetchPosts };
