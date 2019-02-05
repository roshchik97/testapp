var util = require('util');
describe ('RegForm', function (){
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


    it('1/check validation of name field', function(){
        browser.get('http://localhost:8080/TestAppExample/index');
        regForm.Name.clear().sendKeys(nameInvalid);
        regForm.email.clear().sendKeys(emailValid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);

    });

    it('2/check validation of email field', function(){
        browser.get('http://localhost:8080/TestAppExample/index');
        regForm.Name.clear().sendKeys(nameValid);
        regForm.email.clear().sendKeys(emailInvalid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);

    });

    it('3/work of resert button', function(){
        browser.get('http://localhost:8080/TestAppExample/index');
        regForm.Name.clear().sendKeys(nameValid);
        regForm.Address.sendKeys(address);
        regForm.email.clear().sendKeys(emailValid);
        regForm.buttonReset.click();

        expect(regForm.buttonReset.isEnabled()).toBe(false);
        expect(regForm.Name.getText()).toEqual('');
        expect(regForm.Address.getText()).toEqual('');
        expect(regForm.email.getText()).toEqual('');

    });


    it('4/add new user to list', function(){
        browser.get('http://localhost:8080/TestAppExample/index');
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

    it('5/edit user', function(){
        browser.get('http://localhost:8080/TestAppExample/index');
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

    it('6/remove user and check if he is absent', function(){
        browser.get('http://localhost:8080/TestAppExample/index');
        let EC = ExpectedConditions;
        let condition = EC.presenceOf(userList.username1);
        browser.wait(condition,30000);

        userList.removeButton.click();

        let condition1 = EC.presenceOf(window.label);
        browser.wait(condition1);
        let name = userList.username1.getText();

        // let condition2 = EC.textToBePresentInElementValue(window.label, name);
        // browser.wait(condition2,50000);

        expect(window.buttonOk.isEnabled()).toBe(true);

        window.buttonOk.click();

        expect(userList.username1.getText()).not.toBe(name);
    })

});