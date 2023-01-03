async function getArticles() {
  const url = 'https://telex.hu/rss';

  let response = await fetch(url);
  response = await response.text();
  response = new DOMParser().parseFromString(response, 'text/xml');

  return response;
}

(async () => {
  const articles = await getArticles();
  console.log(articles);
})();
