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
    authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors!</p>`;
  });

const fetchMoreAuthors = () => {
  startingIndex += 10;
  endingIndex += 10;
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disbaled = true;
    loadMoreBtn.style.cursor = "not-allowed";
    loadMoreBtn.textContent = "No more data to load!";
  }
};

const displayAuthors = (books) => {
  books.forEach(({ authors, formats, summaries, title }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
<h2 class="author-name">${authors[0].name}</h2>
<img class="user-img" src="${formats["image/jpeg"]}" alt="${
      authors[0].name
    } cover" />
<div class="purple-divider"></div>
<p class="title">${title}<p>
<p class="summaries">${
      summaries.length > 200 ? summaries.slice(0, 200) + "..." : summaries
    }</p>
    <a class="book-link" href="${
      formats["text/plain; charset=us-ascii"]
    }" target="_blank">Read</a>
    </div>
  `;
  });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);
