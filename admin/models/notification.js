var validation = new Validation();
function showError(errorId, mess) {
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
};
function hiddenError(errorId) {
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
}
// check validation
function checkValidation() {
    var name = getEle("TenSP").value;
    var price = getEle("GiaSP").value;
    var image = getEle("HinhSP").value;
    var screen = getEle("screen").value;
    var backCamera = getEle("backCamera").value;
    var frontCamera = getEle("frontCamera").value;
    var type = getEle("typePhone").value;
    var describe = getEle("MoTa").value;
    isValue = true;
    getListProduct()
    .then(function(result){
        isValue &= validation.checkEmpty(name, "errorName", "(*) Vui lòng nhập tên sản phẩm") && validation.checkExistName(name, "errorName", "(*) Tên sản phẩm đã tồn tại", result);
    });
    isValue &= validation.checkEmpty(price, "errorPrice", "(*) Vui lòng nhập giá sản phẩm") && validation.CheckNumber(price, "errorPrice", "(*) Giá sản phẩm vui lòng nhập số");
    isValue &= validation.checkEmpty(image, "errorImage", "(*) Vui lòng thêm ảnh");
    isValue &= validation.checkEmpty(screen, "errorScreen", "(*) Vui lòng nhập kích thước màn hình");
    isValue &= validation.checkEmpty(backCamera, "errorbackCamera", "(*) Vui lòng nhập thông tin camera sau");
    isValue &= validation.checkEmpty(frontCamera, "errorfrontCamera", "(*) Vui lòng nhập thông tin camera trước");
    isValue &= validation.checkEmptyOption("typePhone", "errorTypePhone", "(*) Vui lòng nhập loại sản phẩm");
    isValue &= validation.checkEmpty(describe, "errorDescribe", "(*) Vui lòng nhập mô tả");
    return isValue;
  }
// xóa input
function clearInput(name, price, image, screen, backCamera, frontCamera, type, describe) {
    getEle(name).value = "";
    getEle(price).value = "";
    getEle(image).value = "";
    getEle(screen).value = "";
    getEle(backCamera).value = "";
    getEle(frontCamera).value = "";
    getEle(type).value = 0;
    getEle(describe).value = "";
}
// xóa thông báo 
function clearError(errorName, errorPrice, errorImage, errorScreen, errorbackCamera, errorfrontCamera ,errorTypePhone, errorDescribe) {
    hiddenError(errorName);
    hiddenError(errorPrice);
    hiddenError(errorImage);
    hiddenError(errorScreen);
    hiddenError(errorbackCamera);
    hiddenError(errorfrontCamera);
    hiddenError(errorTypePhone);
    hiddenError(errorDescribe);
}