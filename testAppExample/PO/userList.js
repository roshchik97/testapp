var userList = function(){
    var row = element.all(by.className('user-row ng-scope')).last();

    // this.row = table.element(by.className('user-row ng-scope'));
    this.username = row.element(by.tagName('span'));

};
module.exports = new userList();