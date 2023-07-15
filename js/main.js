//Scroll Header
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").classList.add("headerScroll");
    toggleBtn.style.color="black";
    document.getElementById("dropDown").classList.remove("text-white");
    document.getElementById("logo").style.color = "black";
  } else {
    document.getElementById("header").classList.remove("headerScroll");
    toggleBtn.style.color="white";
    document.getElementById("dropDown").classList.add("text-white");
    document.getElementById("logo").style.color = "#fb811e";
  }
}