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
    })

});