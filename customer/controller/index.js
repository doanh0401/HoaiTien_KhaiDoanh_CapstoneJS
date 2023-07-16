var api = new Service();
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
         } else {
            renderUI(result.data);
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
              <p>${product.screen} "</p>
              <p>${product.backCamera}</p>
              <p>${product.frontCamera}</p>
              <p>Type: ${product.type}</p>
            </div>
          </div>
        </div>
        <div class="btn_main">
          <div class="btn_buy d-flex justify-content-between">
            <div class="btn btn-dark">BUY NOW</div>
            <div>
              <h4 class="price_text">${product.price}</h4>
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


