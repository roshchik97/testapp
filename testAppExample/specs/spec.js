var util = require('util');
describe ('RegForm', function (){
    var regForm = require('../PO/PO_1.js');

    beforeEach (function (){
        browser.get('http://localhost:8080/TestAppExample/index');
    });

    const fs = require('fs');
    let rawdata = fs.readFileSync('fixtures/data.json');
    let user = JSON.parse(rawdata);
    let nameValid = user["name_valid"];
    let nameInvalid = user["name_invalid"];
    let emailValid = user["email_valid"];
    let emailInvalid = user["email_invalid"];
    let address = user["address"];

    it('check validation of name field', function(){
        regForm.Name.clear().sendKeys(nameInvalid);
        regForm.email.clear().sendKeys(emailValid);

        expect(regForm.buttonAdd.isEnabled()).toBe(false);

    })

});