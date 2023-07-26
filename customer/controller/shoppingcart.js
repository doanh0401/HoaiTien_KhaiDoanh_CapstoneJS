var cart = new Cart();
function setLocalStorage() {
  var dataToString = JSON.stringify(cart.arr);
  localStorage.setItem("Cart", dataToString);
}
function getLocalStorage() {
  if (localStorage.getItem("Cart")) {
    var dataString = localStorage.getItem("Cart");
    var dataJSON = JSON.parse(dataString);
    cart.arr = dataJSON;
    //render lai Table
  }
}
function getEle(id) {
    return document.getElementById(id);
}
function renderCart() {
  var content = "";
  let total = 0;
  let totalItem = 0;
  if (cart.arr.length !== 0) {
    for (var i = 0; i < cart.arr.length; i++) {
      var cartitem = cart.arr[i];
      content += `<tr class="table_row">
        <td class="column-1">
            <div class="how-itemcart1">
                <img src="../.${cartitem.img}" width="70px" alt="IMG">
            </div>
        </td>
        <td class="column-2">${cartitem.name}</td>
        <td class="column-3">$ ${cartitem.price}</td>
        <td class="column-4">
            <div class="wrap-num-product d-flex flex-wrap ml-auto mr-0">
                <div onclick="decrease('${cartitem.name}',${cartitem.quantity})" class="btn-num-product-down d-flex hov-btn3 flex-c-m">
                    <i class="fa-solid fa-minus"></i>
                </div>

                <input class="mtext-104 cl3 text-center num-product" type="number"
                    name="num-product1" value="${cartitem.quantity}">

                <div onclick="increase('${cartitem.name}',${cartitem.quantity})" class="btn-num-product-up d-flex cl8 hov-btn3 flex-c-m">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        </td>
        <td onclick="XoaSP('${cartitem.name}')" style="cursor:pointer"class="column-5">Xóa</td>
    </tr>`;
      total += parseInt(cartitem.price) * cartitem.quantity;
      totalItem += cartitem.quantity;
    }
      getEle("tableCart").innerHTML = content;
      getEle("total").innerHTML = `$${total}`;
      getEle("cart-item-count").innerHTML = totalItem;
  } else {
        getEle("total").innerHTML = `$0`;
        getEle("cart-item-count").style.display = "none";
  }
}
window.onload = function () {
    getLocalStorage();
    renderCart();
  }
function decrease(name,quantity){   
    console.log(name);
    if(quantity !== 1) quantity-=1;
    var index = cart.timViTri(name);
    cart.arr[index].quantity=quantity;
    SaveData();
}
function increase(name,quantity){
    quantity +=1;
    var index = cart.timViTri(name);
    cart.arr[index].quantity=quantity;
    SaveData();
}
function XoaSP(name) {
    if(cart.arr.length === 1 ) {
      cart.arr= [];
      SaveData();
      document.location.reload();
    } 
    else {
      cart.xoaGh(name);
      SaveData();
    }
}
function SaveData() {
    setLocalStorage();
    renderCart();
}
function Pay() {
    cart.arr= [];
    SaveData();
    alert("Cám ơn bạn đã mua sắm");
}

