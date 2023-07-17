//Cart
let toggle = false;
const cartBtn = document.querySelector(".fa-times");
const cartShow = document.querySelector(".fa-cart-shopping");
cartShow.addEventListener("click",function(){
  if(toggle){
    document.getElementById("cart").style.right="-100%";
  }else{
    document.getElementById("cart").style.right="0"; 
  }
  toggle = !toggle; 
})
cartBtn.addEventListener("click",function(){
  document.getElementById("cart").style.right="-100%";
})
