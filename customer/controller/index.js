var api = new Service();
var cart = new Cart();
var cartitem = new CartItem();
function getEle(id) {
   return document.getElementById(id);
}
getEle("productType").addEventListener("change", getListProduct);
function getListProduct() {
   getEle("loader").style.display = "block";
   var promise = api.getListProductApi();
   promise
      .then(function (result) {
         var inputTypeProduct =  getEle("productType").value;
         if (inputTypeProduct !== "All") {
            renderUI(filterProducts(result.data, inputTypeProduct));
            let btn = document.querySelectorAll(".buyBtn");
         } else {
            renderUI(result.data);
            let btn = document.querySelectorAll(".buyBtn");
            putItemIntoCart(btn);
         }
         getEle("loader").style.display = "none";
      })
      .catch(function (error) {
         console.log(error);
      })
};
getListProduct();
// hàm render
function renderUI(data) {
   var content = "";
   for (var i = 0; i < data.length; i++) {
      var product = data[i];
      content += `
      <div class="col-lg-3 col-sm-6">
      <div class="product_box">
        <div class="product_content">
          <h2 class="product_name">${product.name}</h2>
          <p class="product_intro">${product.desc}</p>
          <img src="./img/${product.img}" class="img_product" alt="">
          <div class="product_overlay">
            <div class="overlay_text">
              <p>Screen: ${product.screen} "</p>
              <p>BackCamera: ${product.backCamera}</p>
              <p>FrontCamera: ${product.frontCamera}</p>
              <p>Type: ${product.type}</p>
            </div>
          </div>
        </div>
        <div class="btn_main">
          <div class="btn_buy d-flex justify-content-between">
            <button class="buyBtn btn btn-dark">BUY NOW</button>
            <div>
              <h4 class="price_text">Price ${product.price}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
      `
   }
   getEle("product").innerHTML = content;
}

// hàm filterProducts
function filterProducts (data, filter) {
   var array = [];
   for(var i = 0; i< data.length ; i++) {
      if (data[i].type === filter) {
         array.push(data[i]);
      } 
   }
   return array;
}
function putItemIntoCart(btn){
   btn.forEach(function(button,index){
   button.addEventListener("click",function(event){
   var btnItem = event.target;
   var product = (btnItem.parentElement).parentElement.parentElement;
   console.log(product);
   var productImg = product.querySelector("img");
   console.log(productImg);
})
})
}
//Cart display
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
//Cart item
function getEle(id){
    return document.getElementById(id);
}
var api = new Service();
function getEle(id) {
   return document.getElementById(id);
}
//Hiển thị giỏ hàng
function renderCart(data) {
    var content = "";
    for(var i = 0; i<data.length;i++){
        var cartitem = data[i];
        content += 
                `<tr>
                <tr>
                <td class="d-flex align-items-center"><img src="${cartitem.img}" width="70px" alt="">${cartitem.name}</td>
                <td><p><span id="price">${cartitem.price}</span><sup>$</sup></p></td>
                <td><input id="quantity" style="width: 30px; outline: none;" type="number" min="1" value="${cartitem.quantity}" onchange="updateQuantity(${cartItem.name})"></td>
                <td style="cursor: pointer;">Xóa</td>
              </tr>`
    }
    getEle("gioHang").innerHTML = content;
}
//Tính tổng tiền
function total(){
  let total = 0;
  for(let i = 0; i<cart.length;i++){
    let cartitem = cart[i];
    total += cartitem.price*cartitem*quantity;
  }
  getEle("total").innerHTML =`Tổng tiền: ${total}<sup>$</sup>`;
}
function updateQuantity(name) {
}

