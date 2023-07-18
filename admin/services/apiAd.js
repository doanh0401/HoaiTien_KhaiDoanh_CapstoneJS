function ProductApi() {
    this.ListProductApi = function () {
        var promise = axios({
            url: "https://64a92b9a8b9afaf4844a56e0.mockapi.io/api/CyberPhone",
            method: "GET",
        });
        return promise;
    };
    this.addProductApi = function (product) {
        var promise = axios({
            url: "https://64a92b9a8b9afaf4844a56e0.mockapi.io/api/CyberPhone",
            method: "POST",
            data: product,
        });
        return promise;
    };
    this.delProductApi = function (id) {
      var promise = axios({
            url: `https://64a92b9a8b9afaf4844a56e0.mockapi.io/api/CyberPhone/${id}`,
            method: "DELETE",
        });
        return promise;
    };
    this.getProductApiById = function (id) {
       var promise = axios({
            url: `https://64a92b9a8b9afaf4844a56e0.mockapi.io/api/CyberPhone/${id}`,
            method: "GET",
        });
        return promise;
    };
    this.updateProductApi = function (product){
        var promise = axios({
            url: `https://64a92b9a8b9afaf4844a56e0.mockapi.io/api/CyberPhone/${product.id}`,
            method: "PUT",
            data : product,
        });
        return promise;
    }
}