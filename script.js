const apiKey = 'fa4ab98aea9a4686a519ff3a2825edba';  // ← Replace this with your actual API key
const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    renderNews(json.articles);
  } catch (err) {
    document.getElementById('newsList').innerHTML = `<li>${err.message}</li>`;
  }
}

function renderNews(articles) {
  const ul = document.getElementById('newsList');
  ul.innerHTML = '';
  if (!articles || articles.length === 0) {
    ul.innerHTML = '<li>No news found.</li>';
    return;
  }

  articles.forEach(article => {
    const li = document.createElement('li');
    const title = article.title || 'No title';
    const url = article.url || '#';
    const source = (article.source && article.source.name) || 'Unknown';
    const publishedAt = article.publishedAt ? new Date(article.publishedAt).toLocaleString() : '';
    li.innerHTML = `
      <a href="${url}" target="_blank" rel="noopener">${title}</a>
      <div class="meta">${source} &ndash; ${publishedAt}</div>
    `;
    ul.appendChild(li);
  });
}

fetchNews();
