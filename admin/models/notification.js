var validation = new Validation()
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
    isValue &= validation.checkEmpty(name, "errorName", "Vui lòng nhập tên sản phẩm");
    isValue &= validation.checkEmpty(price, "errorPrice", "Vui lòng nhập giá sản phẩm");
    isValue &= validation.checkEmpty(image, "errorImage", "Vui lòng thêm ảnh");
    isValue &= validation.checkEmpty(screen, "errorScreen", "Vui lòng nhập kích thước màn hình");
    isValue &= validation.checkEmpty(backCamera, "errorbackCamera", "Vui lòng nhập thông tin camera sau");
    isValue &= validation.checkEmpty(frontCamera, "errorfrontCamera", "Vui lòng nhập thông tin camera trước");
    isValue &= validation.checkEmpty(type, "errorTypePhone", "Vui lòng nhập loại sản phẩm");
    isValue &= validation.checkEmpty(describe, "errorDescribe", "Vui lòng nhập mô tả");
    return isValue;
}
