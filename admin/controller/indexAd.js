var api = new ProductApi();
function getEle(id) {
  return document.getElementById(id);
}
// toggle
$(function() {
    $('#sidebarCollapse').on('click', function() {
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
function renderTable (data) {
  var content = "" ;
  for(var i = 0; i <data.length; i++) {
    var product = data[i];
    content += `
        <tr>
            <td>${i + 1} </td>
            <td>${product.name} </td>
            <td>${product.price} </td>
            <td><img src="../img/${product.img}" width="50" alt=""</td>
            <td>${product.desc} </td>
            <td>
                <button class="btn btn-warning">Edit</button>
                <button class="btn btn-danger">Del</button>
            </td>
        </tr>
    `
  }
  getEle("tblDanhSachSP").innerHTML = content;
}