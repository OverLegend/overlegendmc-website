function scrollInto(el, offset) {
  let elemetnOffset = document.querySelector(el).offsetTop + offset;
  window.scrollTo(0,elemetnOffset);
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function checkScroll(x) {
  if (window.pageYOffset > x && document.querySelector(".navbar").classList.contains("top")) {
    document.querySelector(".navbar").classList.toggle("top");
  } else if (window.pageYOffset <= x && !document.querySelector(".navbar").classList.contains("top")) {
    document.querySelector(".navbar").classList.toggle("top");
  }
}