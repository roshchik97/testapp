// var util = require('util');
describe ('TestAppExample', function (){
    var regForm = require('../PO/form.js');
    var userList = require('../PO/userList.js');
    var window = require('../PO/window.js');

    beforeEach (function (){
        browser.get('http://localhost:8080/TestAppExample/index');
    });

    const fs = require('fs');
    let rawdata = fs.readFileSync('fixtures/data.json');
    let user = JSON.parse(rawdata);
    let nameValid = user.validName;
    let nameInvalid = user.invalidName;
    let editName = user.editName;
    let emailValid = user.validEmail;
    let emailInvalid = user.invalidEmail;
    let address = user.address;


    it('check validation of name field', function(){
        regForm.Name.clear().sendKeys(nameInvalid);
        regForm.email.clear().sendKeys(emailValid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);

    });

    it('check validation of email field', function(){
        regForm.Name.clear().sendKeys(nameValid);
        regForm.email.clear().sendKeys(emailInvalid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);

    });

    it('work of resert button and check if all fields are empty', function(){
        regForm.Name.clear().sendKeys(nameValid);
        regForm.Address.sendKeys(address);
        regForm.email.clear().sendKeys(emailValid);
        regForm.buttonReset.click();

        expect(regForm.buttonReset.isEnabled()).toBe(false);
        expect(regForm.Name.getText()).toEqual('');
        expect(regForm.Address.getText()).toEqual('');
        expect(regForm.email.getText()).toEqual('');

    });


    it('add new user to list and check whether this user is located in list of users', function(){
        regForm.Name.clear().sendKeys(nameValid);
        regForm.Address.sendKeys(address);
        regForm.email.clear().sendKeys(emailValid);

        expect(regForm.buttonAdd.isEnabled()).toBe(true);

        regForm.buttonAdd.click();

        let EC = ExpectedConditions;
        let condition = EC.textToBePresentInElement(userList.username, nameValid);
        browser.wait(condition,30000);

        expect(userList.username.getText()).toBe(nameValid);

    });

    it('edit user and check', function(){
        let EC = ExpectedConditions;
        let condition1 = EC.presenceOf(userList.username1);
        browser.wait(condition1,30000);

        userList.editButton.click();

        regForm.Name.clear().sendKeys(editName);

        regForm.buttonAdd.click();

        let condition2 = EC.textToBePresentInElement(userList.username1, editName);
        browser.wait(condition2,50000);

        expect(userList.username1.getText()).toBe(editName);

    });

    it('remove user and check if he is absent', function(){
        let EC = ExpectedConditions;
        let condition = EC.presenceOf(userList.username1);
        browser.wait(condition,30000);

        userList.removeButton.click();

        let condition1 = EC.presenceOf(window.label);
        browser.wait(condition1);

        var name = userList.username1.getText();

        expect(window.label.getText()).toContain(name);

        expect(window.buttonOk.isEnabled()).toBe(true);

        window.buttonOk.click();

        expect(userList.username1.getText()).not.toBe(name);
    });

    it('attempt to remove user and cancel action', function(){
        let EC = ExpectedConditions;
        let condition = EC.presenceOf(userList.username1);
        browser.wait(condition,30000);

        userList.removeButton.click();

        let condition1 = EC.presenceOf(window.label);
        browser.wait(condition1);

        var name = userList.username1.getText();

        expect(window.buttonCancel.isEnabled()).toBe(true);

        window.buttonCancel.click();

        expect(userList.username1.getText()).toBe(name);
    })

});