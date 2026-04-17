const slides = document.querySelectorAll(".slide");
const navigation = document.querySelector(".slider-navigation");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentSlide = 0;
function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
  const navigationDots = Array.from(navigation.children);
  navigationDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
  currentSlide = index;
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);
setInterval(nextSlide, 5000);
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => showSlide(i));
  navigation.appendChild(dot);
}
showSlide(currentSlide);
