var api = new ProductApi();
function getEle(id) {
  return document.getElementById(id);
}
// toggle
$(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
  });
});
// 
// hàm lấy sảm phẩm
function getListProduct() {
  var promise = api.ListProductApi();
  promise
    .then(function (results) {
      renderTable(results.data);
    })
    .catch(function (error) {
      console.log(error);
    })
}
getListProduct();
// hàm render sảm phẩm
function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
        <tr>
            <td>${i + 1} </td>
            <td>${product.name} </td>
            <td>${product.price} </td>
            <td><img src="../img/${product.img}" width="50" alt=""</td>
            <td>${product.screen} </td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.desc} </td>
            <td>${product.type} </td>
            <td>
                <button class="btn btn-warning" data-toggle="modal"
                data-target="#myModal" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="delProduct(${product.id})">Del</button>
            </td>
        </tr>
    `
  }
  getEle("tblDanhSachSP").innerHTML = content;
}
// hàm thêm button addProduct
function addBtnProduct() {
  document.querySelector(".modal-title").innerHTML = "Add Product";
  document.querySelector(".modal-footer").innerHTML = `<button onclick="addProduct()" class="btn btn-success">Add</button>`
}
// hàm thêm product
function addProduct() {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var image = getEle("HinhSP").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var type = getEle("typePhone").value;
  var describe = getEle("MoTa").value;
  var product = new Product("", name, price, image, screen, backCamera, frontCamera, describe, type);
  var promise = api.addProductApi(product);
  promise
    .then(function (results) {
      getListProduct();
      document.querySelector(".close").click();
    })
    .catch(function (error) {
      console.log(error);
    })
}
// hàm xóa sản phẩm
function delProduct(id) {
  var promise = api.delProductApi(id);
  promise
    .then(function (results) {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    })
}
// hàm sửa sản phẩm 
function editProduct(id) {
  document.querySelector(".modal-title").innerHTML = "Edit Product";
  document.querySelector(".modal-footer").innerHTML = `<button onclick="updateProduct(${id})" class="btn btn-warning">Update</button>`;
  var promise = api.getProductApiById(id);
  promise
    .then(function (results) {
      getEle("TenSP").value = results.data.name;
      getEle("GiaSP").value = results.data.price;
      getEle("HinhSP").value = results.data.img;
      getEle("screen").value = results.data.screen;
      getEle("backCamera").value = results.data.backCamera;
      getEle("frontCamera").value = results.data.frontCamera;
      getEle("MoTa").value = results.data.desc;
      getEle("typePhone").value = results.data.type;
    })
    .catch(function (error) {
      console.log(error);
    })
    
}

// hàm cập nhật product 
function updateProduct(id) {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var image = getEle("HinhSP").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var describe = getEle("MoTa").value;
  var type = getEle("typePhone").value;
  var product = new Product(id, name, price, image, screen, backCamera, frontCamera, describe, type);
  var promise = api.updateProductApi(product);
  promise
  .then(function(results){
    getListProduct();
    document.querySelector(".close").click();
  })
  .catch(function(error){
    console.log(error);
  })
}