function Validation () {
    this.checkEmpty = function (value, errorId, mess) {
        if (value === "") {
            showError(errorId, mess);
            return false;
        }
        hiddenError(errorId);
        return true;
    };
    this.checkEmptyOption = function (idCheck, errorId, mess) {
        var dataCheck = document.getElementById(idCheck);
        if (dataCheck.selectedIndex !== 0) {
            hiddenError(errorId);
            return true;
        }
        showError(errorId, mess);
        return false;
    };
    this.CheckNumber = function (value, errorId, mess) {
        var pattern = /^[0-9]+$/;
        if (pattern.test(value)) {
            hiddenError(errorId);
            return true;
        }
        showError(errorId, mess);
        return false;
    };
    this.checkExistName = function (value, errorId, mess, listProduct) {
        var existName = false;
        for(var i = 0; i < listProduct.length; i++) {
            if(value === listProduct[i].name) {
                existName = true;
                break;
            }
        }
        if(existName) {
            showError(errorId, mess);
            return false;
        }
        hiddenError(errorId);
        return true;
    }
}