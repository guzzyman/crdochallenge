const baseUrl = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1`;
// get the news container element and pagination links elements from the DOM
const newsContainer = document.querySelector(".news-container"); // container for news items
const nextLink = document.querySelector("#next"); // link for next page of news items
const backLink = document.querySelector("#back"); // link for previous page of news items
let isEdit = false;

let pageNumber = 1; // current page number (defaults to 1)

// function to fetch the news from the API and add them to the DOM
function getNews() {
  fetch(`${baseUrl}/news?page=${pageNumber}&limit=10`) // fetch data from API using current page number
    .then((response) => response.json()) // convert response to JSON format
    .then((data) => {
      let output = ""; // create empty string variable to store HTML output

      data.forEach((item) => {
        // loop through each item in the data array

        output += `<div class="news-item-container">
                      <div class="news-item">${item.title}</div>
                      <div class="news-item"><a href="newsDetails.html?id=${item.id}">Details</a></div>
                  </div>`; // add title of item to HTML output string
      });
      newsContainer.innerHTML = output;
    });
}
getNews();
// call function when page loads
/* Event Listeners */
nextLink.addEventListener("click", () => {
  pageNumber++;
  getNews();
});
backLink.addEventListener("click", () => {
  if (pageNumber > 1) {
    pageNumber--;
    getNews();
  }
});

// Get modal element
var modal = document.getElementById("addEditNewsModal");
// Get open modal button
var modalBtn = document.getElementById("modalBtn");
// Get close button
var closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for open click
modalBtn.addEventListener("click", openModal);
// Listen for close click
closeBtn.addEventListener("click", closeModal);
// Listen for outside click
window.addEventListener("click", outsideClick);

// Open modal
function openModal() {
  modal.style.display = "block";
}

// Close modal
function closeModal() {
  modal.style.display = "none";
}

// Click outside and close
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// Add/Edit News
const newsformElement = document.getElementById("newsForm");
newsformElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newsInputElement = document.querySelector("#newsForm textarea");
  const newsValue = newsInputElement.value;
  const avatar = document.getElementById("avatar").value;
  const url = document.getElementById("url").value;
  const author = document.getElementById("author").value;

  if (newsValue === "" || newsValue === undefined) {
    alert("You must enter a news");
  } else {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const newsPayload = {
      author: author,
      title: newsValue,
      avatar: avatar,
      url: url,
    };

    const request = new Request(`${baseUrl}/news`, {
      method: "POST",
      headers,
      body: JSON.stringify(newsPayload),
    });

    const editRequest = new Request(
      `${baseUrl}/news/1`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(newsPayload),
      }
    );

    isEdit
      ? fetch(editRequest)
          .then((response) => response.json())
          .then((data) => {
            // Append news to DOM
            const newsElement = document.createElement("div");
            newsElement.className = "news-item-container";
            newsElement.innerHTML = `<div id="news-${data.id}">${data.news}</div> 
            <div>
              <span class='edit' onclick=handleEdit(${data.id})>Edit</span>  |  <span class='delete' onclick=deleteItem(${data.id})>Delete</span>
            </div>`;
            isEdit = false;
            // Reset form element
            newsformElement.reset();
          })
      : fetch(request)
          .then((response) => response.json())
          .then((data) => {
            // Append new news to DOM
            const newsElement = document.createElement("div");
            newsElement.className = "newsItem";
            newsElement.innerHTML = `<div id="news-${data.id}">${data.news}</div> 
        <div>
          <span class='edit' onclick=handleEdit(${data.id})>Edit</span>  |  <span class='delete' onclick=deleteItem(${data.id})>Delete</span>
        </div>`;
            const newsSectionElement = document.querySelector(".news");
            newsSectionElement.appendChild(newsElement);
            // Reset form element
            newsformElement.reset();
          });
  }
});
