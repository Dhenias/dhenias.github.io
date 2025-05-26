window.onscroll = function() {stickyHeader()};

var header = document.getElementById("header");
var sticky = header.offsetTop;
var body = document.querySelector('.body');
var headerHeight = header.offsetHeight;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    if (body) body.style.paddingTop = headerHeight + "px";
  } else {
    header.classList.remove("sticky");
    if (body) body.style.paddingTop = "";
  }
}