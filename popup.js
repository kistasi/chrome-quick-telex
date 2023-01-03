async function getArticles() {
  const url = 'https://telex.hu/rss';

  let response = await fetch(url);
  response = await response.text();
  response = new DOMParser().parseFromString(response, 'text/xml');

  return response;
}

function transformArticlesToJson(articles) {
  const items = articles.querySelectorAll('rss channel item');
  let results = [];

  items.forEach(item => {
    let date = item.querySelector('pubDate').textContent;
    date = new Date(date).toLocaleDateString('hu-HU');

    results.push({
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      date: date,
      description: item.querySelector('description').textContent,
    });
  });

  return results;
}

(async () => {
  let articles = await getArticles();
  articles = transformArticlesToJson(articles);
  console.log(articles);
})();
