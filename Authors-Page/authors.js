const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let startingIndex = 1;
let endingIndex = 10;
let authorDataArr = [];

fetch("https://gutendex.com/books/")
  .then((res) => res.json())
  .then((data) => {
    authorDataArr = data.results;
    console.log(authorDataArr);
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  })
  .catch((err) => {
    console.error(`There was an error: ${err}`);
  });

const fetchMoreAuthors = () => {
  startingIndex += 10;
  endingIndex += 10;
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
};

const displayAuthors = (books) => {
  books.forEach(({ authors, formats, summaries, title }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
<h2 class="author-name">${authors[0].name}</h2>
<img class="user-img" src="${formats["image/jpeg"]}" alt="${authors[0].name} cover" />
<p class="title">${title}<p>
<p class="summaries">${summaries}</p>
    </div>
  `;
  });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);
