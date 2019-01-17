describe('tagmanager_google', function (){
    it ('1_login',function(){
        //попытка авторизоваться
        var xb = element.all(by.className('Xb9hP')).first(),
            ident = xb.element(by.name('identifier')),
            next = element.all(by.className('CwaK9')).first();

        browser.waitForAngularEnabled(false);
        browser.get('https://tagmanager.google.com/#/admin/accounts/create');
        // browser.pause();

        const fs = require('fs');
        let rawdata = fs.readFileSync('data.json');
        let user = JSON.parse(rawdata);
        let loginValue = user["login"];

        ident.click().sendKeys(loginValue);
        next.click();

        expect(browser.getCurrentUrl()).toEqual('https://tagmanager.google.com/#/admin/accounts/create');

    });


    it('2_account_name', function(){
          var account = element(by.name('form.account.data.name'));

          account.click();
          account.clear().sendKeys('roshchik97');

          expect(account.isDisplayed()).toBe(true);//Название аккаунта присутствует на форме
          expect(account.getAttribute('value').toBe('roshchik97'));//соответствие значения
      });

      it('3_checkbox', function (){
          var check = element.all(by.name('form.account.data.shareData')).first();

          expect(check.isSelected()).toBe(false);
          check.click();
          expect(check.isSelected()).toBe(true);//чекбокс отмечен

      });

      it('4_present_next', function(){
          var but = element.all(by.className('gtm-stepper-step-buttons')).first(),
             button = but.element(by.tagName('button')),
              //button = but.element(by.className('btn btn-action')),
              div = element.all(by.className('big-form-input gtm-container-form__name')).first(),
              name = div.element(by.tagName('label'));

          expect(button.isDisplayed()).toBe(true);//кнопка Далее активна
          button.click();
          expect(name.isDisplayed()).toBe(true);//Настройка контейнера отображается на форме
      });

      it('5_container_name', function(){
          var div = element.all(by.className('big-form-input gtm-container-form__name')).first(),
              label = div.element(by.tagName('input'));

          label.clear().sendKeys('www.roshchik.ru');
          expect(label.getAttribute('value').toBe('www.rohchik.ru'));
      });

      it('6_check_website', function(){
          var website = element.all(by.css('.chip large selector selected')).first();

          website.click();

          expect(website.isSelected()).toBe(true);
      });

});