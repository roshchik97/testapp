var userList = function(){
    var lastrow = element.all(by.className('user-row ng-scope')).last();
    var firstrow = element.all(by.className('user-row ng-scope')).first();

    this.username = lastrow.element(by.tagName('span'));

    this.username1 = firstrow.element(by.tagName('span'));
    this.editButton = firstrow.element(by.className('btn btn-success custom-width'));
    this.removeButton = firstrow.element(by.className('btn btn-danger custom-width'));

};
module.exports = new userList();