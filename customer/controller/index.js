var api = new Service();
var cart = new Cart();
let btn;
var listProduct = [];
function getEle(id) {
  return document.getElementById(id);
}
getEle("productType").addEventListener("change", getListProduct);
function getListProduct() {
  getEle("loader").style.display = "block";
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      var inputTypeProduct = getEle("productType").value;
      if (inputTypeProduct !== "All") {
        renderUI(filterProducts(result.data, inputTypeProduct));
      } else {
        renderUI(result.data);
      }
      getEle("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();
// hàm render
function renderUI(data) {
  var content = "";
  listProduct = data;
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
            <button class="buyBtn btn btn-dark" onclick="putItemIntoCart('${product.name}')">BUY NOW</button>
            <div>
              <h4 class="price_text">Price <span class="price_number">${product.price}</span></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
  }
  getEle("product").innerHTML = content;
  let temp = document.querySelectorAll(".buyBtn");
  saveBtn(temp);
}

// hàm filterProducts
function filterProducts(data, filter) {
  var array = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].type === filter) {
      array.push(data[i]);
    }
  }
  return array;
}
function saveBtn(temp) {
  btn = temp;
}
function putItemIntoCart(name) {
  const index = cart.timViTri(name);
  console.log(index);
  if (index === -1) {
    for (let i = 0; i < listProduct.length; i++) {
      var product = listProduct[i];
      if (product.name === name) {
        const productName = name;
        const productImg = `./img/${product.img}`;
        const productQuantity = 1;
        const productPrice = product.price;
        const cartitem = new CartItem(
          "",
          productName,
          productPrice,
          productImg,
          productQuantity
        );
        cart.arr.push(cartitem);
        renderCart(cart.arr);
      }
    }
  } else {
    cart.arr[index].quantity += 1;
    renderCart(cart.arr);
  }
}
//Cart display
let toggle = false;
const cartBtn = document.querySelector(".fa-times");
const cartShow = getEle("cartToggle");
cartShow.addEventListener("click", function () {
  if (toggle) {
    document.getElementById("cart").style.right = "-100%";
  } else {
    document.getElementById("cart").style.right = "0";
  }
  toggle = !toggle;
});
cartBtn.addEventListener("click", function () {
  document.getElementById("cart").style.right = "-100%";
});
//Hiển thị giỏ hàng
function renderCart(data) {
  var content = "";
  let total = 0;
  console.log(data.length);
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var cartitem = data[i];
      content += `<tr>
                <tr>
                <td class="d-flex align-items-center"><img src="${cartitem.img}" width="70px" alt="">${cartitem.name}</td>
                <td><p><span id="price">${cartitem.price}</span><sup>$</sup></p></td>
                <td><input id="quantity" style="width: 30px; outline: none;" type="number" min="1" value="${cartitem.quantity}" onchange="updateQuantity(${cartitem.name})"></td>
                <td style="cursor: pointer;" onclick="XoaSP('${cartitem.name}')">Xóa</td>
              </tr>`;
      total += parseInt(cartitem.price) * cartitem.quantity;
    }
    getEle("gioHang").innerHTML = content;
    getEle("total").innerHTML = `Tổng tiền: ${total}<sup>$</sup>`;
  } else {
    getEle("cartTable").style.display = "none";
  }
}
//Tính tổng tiền
function total() {
  alert("Cảm ơn bạn đã mua hàng <3");
  cart.arr = [];
  renderCart(cart.arr);
}
function updateQuantity(name) {}
//Xoá khỏi giỏ hàng
function XoaSP(name) {
  cart.xoaGh(name);
  renderCart(cart.arr);
}
