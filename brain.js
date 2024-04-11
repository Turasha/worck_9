"use strict";

//fetch GET

let users = document.getElementById("users");
let fulinfo = document.getElementById("fulinfo");
let closeX = document.getElementById("close");

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "GET",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    let fragment = document.createDocumentFragment();


    info.forEach((element) => {
      let h2 = document.createElement("h2");
      h2.innerText = `${element.id}`;

      let p = document.createElement("p");
      p.innerText = `${element.title}`;
      let titleDiv = document.createElement("div");
      titleDiv.setAttribute("data-id", element.id);
      titleDiv.classList.add("info");
      titleDiv.appendChild(h2);
      titleDiv.appendChild(p);
      fragment.appendChild(titleDiv);

      
      titleDiv.addEventListener("click", function () {
        fulinfo.classList.add("active");
        let postId = this.getAttribute("data-id");
        fetch("https://jsonplaceholder.typicode.com/posts" + "/" + postId, {
          method: "GET",
        })
          .then(function (param) {
            return param.json();
          })
          .then(function (item) {
            let newP = document.createElement("p");
            newP.innerText = `${item.body}`;

            fulinfo.appendChild(newP);
            closeX.addEventListener('click', function(){
                newP.innerText=" "
            })
          });
      });
      closeX.addEventListener("click", function () {
        fulinfo.classList.remove("active");
        
      });
    });

    users.appendChild(fragment);
  });