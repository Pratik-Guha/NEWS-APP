// const ApiKey = "pub_279955381027fc1e053037180d4519a766151";
const ApiKey = "8a24fce156e64c1a81e053dc0c220931";

// const url = "https://newsdata.io/api/1/news?q=";
// https://newsdata.io/api/1/news?apikey=pub_279955381027fc1e053037180d4519a766151&q=cryptocurrency
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("India"));

function reload() {
  window.location.reload();
}

async function fetchnews(query) {
  // const response = await fetch(`${url}${query}&apikey=${ApiKey}`);
  const response = await fetch(`${url}${query}&apikey=${ApiKey}`);
  const data = await response.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cards_container = document.getElementById("cards-container");
  const newscardTemplate = document.getElementById("news-template");

  cards_container.innerHTML = " ";
  articles.forEach(article => {
    if (!article.urlToImage) return;
    const cardClone = newscardTemplate.content.cloneNode(true);
    fillData(cardClone, article);
    cards_container.appendChild(cardClone);
  });
}
function fillData(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const news_title = cardClone.querySelector("#news-title");
  const news_source = cardClone.querySelector("#news-source");
  const news_descript = cardClone.querySelector("#news-descript");

  newsImg.src = article.urlToImage;
  news_title.innerHTML = article.title;
  news_descript.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  news_source.innerHTML = `${article.source.name} · ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curentSelectedNav = null;
function onNavitemclic(id) {
  fetchnews(id);
  const navitem = document.getElementById(id);
  curentSelectedNav?.classList.remove("active");
  curentSelectedNav = navitem;
  curentSelectedNav.classList.add("active");
}

const search_button = document.getElementById("search-button");
const search_text = document.getElementById("search-text");

search_button.addEventListener("click", () => {
  const query = search_text.value;
  if (!query) return;
  fetchnews(query);
  curentSelectedNav?.classList.remove("active");
  curentSelectedNav = null;
});
