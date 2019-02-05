var window = function (){
    var wind = element(by.className('modal-dialog'));
    var footer = element(by.className('modal-footer ng-scope'));

    this.label = wind.element(by.tagName('label'));
    this.buttonOk = footer.element(by.className('btn btn-primary'));
    this.buttonCancel = footer.element(by.className('btn btn-warning'));
};

module.exports = new window();