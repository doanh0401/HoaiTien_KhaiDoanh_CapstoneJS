function Service() {
   this.getListProductApi = function() {
    var promise =  axios({
            url: "https://64a92b9a8b9afaf4844a56e0.mockapi.io/api/CyberPhone",
            method: "GET",
        });
        return promise;
    }
}