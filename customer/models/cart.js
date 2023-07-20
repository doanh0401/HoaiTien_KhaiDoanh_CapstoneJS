function Cart () {
    this.arr = [];
    this.themGH = function (cartitem) {
        this.arr.push(cartitem);
    };
    this.timViTri = function (name) {
        var index = -1;
        for (let i = 0; i < this.arr.length; i++) {
        if (String(name) === this.arr[i].name) {
        index = i;
      }
    }
    return index;
    };
    this.xoaGh = function (id) {
        var index = this.timViTri(id);
        if(index !== -1) {
            this.arr.splice(index,1);
        }
    };
    this.capNhatSL = function (name) {};
}
