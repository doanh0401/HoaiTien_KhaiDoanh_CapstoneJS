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
// function getListProduct() {
//   getEle("loader").style.display = "block";
//   var data = [];
//   var promise = api.ListProductApi();
//   promise
//     .then(function (results) {
//       renderTable(results.data);
//       getEle("loader").style.display = "none";
//       data = results.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//   return data;
// }
function getListProduct() {
  getEle("loader").style.display = "block";
  var promise = api.ListProductApi();
  return promise.then(function (result) {
    renderTable(result.data);
    getEle("loader").style.display = "none";
    return result.data;
  }).catch(function (error) {
    console.log(error);
  });
}
getListProduct()
// .then(function(result){
//   console.log(result);
// });
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
                <button class="btn btn-warning mt-1" data-toggle="modal"
                data-target="#myModal" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger mt-1" onclick="delProduct(${product.id})">Del</button>
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
  clearInput("TenSP", "GiaSP", "HinhSP", "screen", "backCamera", "frontCamera", "typePhone", "MoTa");
  clearError("errorName", "errorPrice", "errorImage", "errorScreen", "errorbackCamera", "errorfrontCamera", "errorTypePhone", "errorDescribe");
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

  if (checkValidation(true)) {
    var product = new Product("", name, price, image, screen, backCamera, frontCamera, describe, type);
    var promise = api.addProductApi(product);
    promise
      .then(function (results) {
        getListProduct();
        document.querySelector(".close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
// hàm xóa sản phẩm
function delProduct(id) {
  document.getElementById("confirmation-popup").style.display = "block";
  document.getElementById("confirm-button").addEventListener("click", function() {
  var promise = api.delProductApi(id);
  promise
    .then(function (results) {
      getListProduct();
      alert(`Delete ${results.data.name} success`)
    })
    .catch(function (error) {
      console.log(error);
    })
    document.getElementById("confirmation-popup").style.display = "none";
  });
  document.getElementById("cancel-button").addEventListener("click", function() {
    document.getElementById("confirmation-popup").style.display = "none";
  });
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
  clearError("errorName", "errorPrice", "errorImage", "errorScreen", "errorbackCamera", "errorfrontCamera", "errorTypePhone", "errorDescribe");
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
  if (checkValidation(false)) {
    var product = new Product(id, name, price, image, screen, backCamera, frontCamera, describe, type);
    var promise = api.updateProductApi(product);
    promise
      .then(function (results) {
        getListProduct();
        document.querySelector(".close").click();
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
// hàm tìm kiếm sản phẩm
function searchNameProduct() {
  var dataInput = getEle("searchtxt").value;
  var array = [];
  var promise = api.ListProductApi();
  promise
    .then(function (results) {
      for (var i = 0; i < results.data.length; i++) {
        var product = results.data[i];
        var dataInputLowerCase = dataInput.toLowerCase();
        var dataLowerCase = product.name.toLowerCase();
        if (dataLowerCase.indexOf(dataInputLowerCase) !== -1) {
          array.push(product);
        }
      }
      renderTable(array);
    })
    .catch(function (error) {
      console.log(error);
    })

}
getEle("searchtxt").addEventListener("keyup", searchNameProduct);

// hàm sắp sếp 
getEle("productType").addEventListener("change", priceSort);
function priceSort() {
  var inputSort = getEle("productType").value;
  var promise = api.ListProductApi();
  promise
    .then(function (result) {
      if (inputSort === "giaThap") {
        var priceProduct = sortDescending(result.data);
        renderTable(priceProduct);
      } else if (inputSort === "giaCao") {
        renderTable(sortAscending(result.data));
      } else {
        renderTable(result.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}
// hàm lấy giá từ lớn => bé
function sortDescending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (Number(arr[j].price) < Number(arr[j + 1].price)) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
// hàm lấy giá trị từ bé => lớn
function sortAscending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (Number(arr[j].price) > Number(arr[j + 1].price)) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}