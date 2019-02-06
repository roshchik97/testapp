var spawn = require('child_process').spawn;
var updateWebdriverManager = spawn('node node_modules/protractor/bin/webdriver-manager update', {
    stdio: 'inherit',
    shell: true
});
updateWebdriverManager.on('close', function (wmUpdateExitCode) {
    var waitForWebdriverStartTimeout = 2000;
    var tests;
    if (wmUpdateExitCode !== 0) {
        process.exit(1);
    }
    spawn('node node_modules/protractor/bin/webdriver-manager start', {
        shell: true
    });
    setTimeout(function () {
        tests = spawn('node node_modules/protractor/bin/protractor conf.js', {
            stdio: 'inherit',
            shell: true
        });
        tests.on('close', function (testsExitCode) {
            var killSelenium = spawn('for /f "tokens=5" %a in (\'netstat -aon ^| find "0.0.0.0:4444"\') do taskkill /f /pid %a', {
                stdio: 'inherit',
                shell: true
            });
            killSelenium.on('close', function () {
                if (testsExitCode === 0) {
                    process.exit(0);
                }
                process.exit(1);
            });
        })
    }, waitForWebdriverStartTimeout);
});