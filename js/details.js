// Get the URLSearch Parameter
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
const baseUrl = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1`;
let isEdit = false;
let editCommentId;

// Get the news details from API and display it on the page.
fetch(`${baseUrl}/news/${myParam}`)
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(".news-details h1").innerHTML = data.title;

    let content = document.querySelector(".news-content");

    content.innerHTML = data.title;
    let newsId = data.id;
    let name = data.author;
    let avatar = data.avatar;

    // Get the images for the slider from API and display it on the page.
    fetch(`${baseUrl}/news/${myParam}/images`)
      .then((response) => response.json())
      .then((data) => {
        let slider = document.querySelector(".news-images");

        let images = "";

        data.forEach((image) => {
          console.log(Object.keys(image)[0]);

          images += `<div class="block"><img src=${image.image} alt="" width="100%" height="200px" /></div>`;
        });

        slider.innerHTML = images;

        var nextBtn = document.querySelector(".slider .buttons .next");
        var prevBtn = document.querySelector(".slider .buttons .prev");
        var slide = document.querySelectorAll(".slider .news-images .block");
        let sliderDiv = document.querySelector(".news-images");
        sliderDiv.firstElementChild.classList.add("active");

        var i = 0;

        prevBtn.onclick = function () {
          slide[i].classList.remove("active");
          i--;

          if (i < 0) {
            i = slide.length - 1;
          }
          slide[i].classList.add("active");
        };

        nextBtn.onclick = function () {
          slide[i].classList.remove("active");
          i++;

          if (i >= slide.length) {
            i = 0;
          }

          slide[i].classList.add("active");
        };
      });

    // Get comments from API and display it on the page

    fetch(`${baseUrl}/news/${myParam}/comments`)
      .then((response) => response.json())
      .then((data) => {
        let commentsSection = document.querySelector(".comments");

        let comments = "";

        data.forEach((comment) => {
          comments += `<div id="comment-${comment.id}" class="commentItem">
                          <div>${comment.comment}</div> 
                          <div><span class='edit' onclick=handleEdit(${comment.id})>Edit</span>  |  <span class='delete' onclick=deleteItem(${comment.id})>Delete</span></div>
                      </div>`;
        });

        commentsSection.innerHTML = comments;
      });

    // Add a comment to news item
    const formElement = document.getElementById("commentForm");
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const commentInputElement = document.querySelector(
        "#commentForm textarea"
      );
      const commentValue = commentInputElement.value;

      if (commentValue === "" || commentValue === undefined) {
        alert("You must enter a comment");
      } else {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const commentPayload = {
          newsId: newsId,
          name: name,
          avatar: avatar,
          comment: commentValue,
        };

        const request = new Request(`${baseUrl}/news/${myParam}/comments`, {
          method: "POST",
          headers,
          body: JSON.stringify(commentPayload),
        });

        const editCommentPayload = {
          newsId: newsId,
          name: name,
          avatar: avatar,
          comment: commentValue,
          commentid: editCommentId,
        };

        const editRequest = new Request(
          `${baseUrl}/news/${myParam}/comments/${editCommentId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(commentPayload),
          }
        );

        isEdit
          ? fetch(editRequest)
              .then((response) => response.json())
              .then((data) => {
                // Append new comment to DOM
                const newCommentElement = document.createElement("div");
                newCommentElement.className = "commentItem";
                newCommentElement.innerHTML = `<div id="comment-${data.id}">${data.comment}</div> 
                <div>
                  <span class='edit' onclick=handleEdit(${data.id})>Edit</span>  |  <span class='delete' onclick=deleteItem(${data.id})>Delete</span>
                </div>`;
                // const commentsSectionElement =
                //   document.querySelector(".comments");
                // commentsSectionElement.appendChild(newCommentElement);
                isEdit = false;
                // Reset form element
                formElement.reset();
                
              })
          : fetch(request)
              .then((response) => response.json())
              .then((data) => {
                // Append new comment to DOM
                const newCommentElement = document.createElement("div");
                newCommentElement.className = "commentItem";
                newCommentElement.innerHTML = `<div id="comment-${data.id}">${data.comment}</div> 
            <div>
              <span class='edit' onclick=handleEdit(${data.id})>Edit</span>  |  <span class='delete' onclick=deleteItem(${data.id})>Delete</span>
            </div>`;
                const commentsSectionElement =
                  document.querySelector(".comments");
                commentsSectionElement.appendChild(newCommentElement);
                // Reset form element
                formElement.reset();
              });
      }
    });
  });

  // Delete comments
function deleteItem(id) {
  console.log(`${baseUrl}/news/${myParam}/comments/${id}`);
  // Get the item row by its ID.
  var commentRow = document.getElementById("comment-" + id);

  // Get the parent element of the item row
  var parentElement = commentRow.parentElement;

  const deleteRequest = new Request(
    `${baseUrl}/news/${myParam}/comments/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application / json",
      },
    }
  );

  fetch(deleteRequest)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Remove deleted element from DOM
      parentElement.removeChild(commentRow);
    });
}

// Update textarea/parameters before update
function handleEdit(id) {
  // Get the item row by its ID.
  var commentRow = document.getElementById("comment-" + id);
  const comment = (document.querySelector('textarea[name="comment"]').value =
    commentRow.firstElementChild.innerHTML);
  isEdit = true;
  document.querySelector(".btnSubmit").innerHTML = "Update Comment";
  document.querySelector(".editId").value = id;
  editCommentId = id;
}


