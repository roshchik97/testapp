var RegForm = function (){

    var form = element.all(by.className('formcontainer')).first();

    this.Name = form.element(by.id('uname'));
    this.Address = form.element(by.id('address'));
    this.email = form.element(by.id('email'));

    this.buttonAdd = form.element(by.className('btn btn-primary btn-sm'));
    this.buttonReset = form.element(by.className('btn btn-warning btn-sm'));
    // this.buttonUpdate = form.element(by.className('btn btn-primary btn-sm'));
};

module.exports = new RegForm();