function Cart () {
    this.arr = [];
    this.themGH = function (cartitem) {
        this.arr.push(cartitem);
    };
    this.timViTri = function (keyword) {
        var mangTimKiem = [];
        for(var i =0;i<this.arr.length;i++){
        var cartitem = this.arr[i];
        if(cartitem.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
        mangTimKiem.push(cartitem);
    }
  }
  return mangTimKiem;
    };
    this.xoaGh = function (id) {
        var index = this.timViTri(id);
        if(index !== -1) {
            this.arr.splice(index,1);
        }
    };
    this.capNhatSL = function (name) {};
}