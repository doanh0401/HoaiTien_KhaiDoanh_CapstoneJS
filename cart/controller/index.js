var api = new Service();
var cart = new Cart();
var cartitem = new CartItem();
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