window.onscroll = function() {stickyHeader()};

var header = document.getElementById("header");
var sticky = header.offsetTop - 170;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}