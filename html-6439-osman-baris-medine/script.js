const arrows = document.querySelectorAll(".arrow ");
const bookLists = document.querySelectorAll(".book-list");

arrows.forEach((arrow, i) => {
  arrow.addEventListener("click", function () {
    bookLists[i].style.transform = "tranlateX(-295px)";
  });
});
