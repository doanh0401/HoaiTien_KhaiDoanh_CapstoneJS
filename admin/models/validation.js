function Validation () {
    this.checkEmpty = function (value, errorId, mess) {
        if (value === "") {
            showError(errorId, mess);
            return false;
        }
        hiddenError(errorId);
        return true;
    }
}