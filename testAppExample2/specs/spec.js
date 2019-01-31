var util = require('util');
describe ('RegForm', function (){
    var regForm = require('../PO/form.js');
    var userList = require('../PO/userList');

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
        regForm.Name.clear().sendKeys(nameInvalid);
        regForm.email.clear().sendKeys(emailValid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);
        browser.refresh();

    });

    it('2/check validation of email field', function(){
        regForm.Name.clear().sendKeys(nameValid);
        regForm.email.clear().sendKeys(emailInvalid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);
        browser.refresh();
    });

    it('3/work of resert button', function(){
        regForm.Name.clear().sendKeys(nameValid);
        regForm.Address.sendKeys(address);
        regForm.email.clear().sendKeys(emailValid);
        regForm.buttonReset.click();

        expect(regForm.buttonReset.isEnabled()).toBe(false);
        expect(regForm.Name.getText()).toEqual('');
        expect(regForm.Address.getText()).toEqual('');
        expect(regForm.email.getText()).toEqual('');
        browser.refresh();

    });


    // browser.manage().timeouts().implicitlyWait(50000)    ???????????

    it('4/add new user to list', function(){
        regForm.Name.clear().sendKeys(nameValid);
        regForm.Address.sendKeys(address);
        regForm.email.clear().sendKeys(emailValid);

        expect(regForm.buttonAdd.isEnabled()).toBe(true);

        regForm.buttonAdd.click();

        let EC = ExpectedConditions;
        let condition = EC.textToBePresentInElement(userList.username, nameValid);
        browser.wait(condition,30000);

        expect(userList.username.getText()).toBe(nameValid);//?????????
        browser.refresh();
    });
    // browser.manage().timeouts().implicitlyWait(50000)
    it('5/edit user', function(){
        let EC = ExpectedConditions;
        let condition1 = EC.presenceOf(userList.username1);
        browser.wait(condition,30000);

        userList.editButton.click();

        regForm.Name.clear().sendKeys(editName);

        regForm.buttonAdd.click();

        let condition2 = EC.textToBePresentInElement(userList.username1, editName);
        browser.wait(condition2,30000);

        expect(userList.username1.getText()).toBe(editName);
        browser.refresh();
    })

});