require('chromedriver');


let Config = require('./config.js');

let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

console.log("Inside login.js");

function AsgardLogin() {
    var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get(Config.url);
    driver.switchTo().frame('innerFrame');
    driver.findElement(By.name('username')).sendKeys(Config.username);
    driver.findElement(By.name('password')).sendKeys(Config.password);
    // driver.findElement(By.className(' form-submit art-button buttonFont')).click();
    // driver.wait(until.elementIsVisible(driver.findElement({ id: 'footerLinks' })), 5000);
    // driver.quit();
    console.log("in Asgard function");
}

// let loginButton = document.querySelector('button');
// loginButton.addEventListener('click', AsgardLogin());

//module.exports = function() {
    // var ipc = require('electron').ipcRenderer;
    // var loginButton = document.getElementById('login');
    // loginButton.addEventListener('click', function () {
    //     // ipc.once('actionReply', function (event, response) {
    //     //     processResponse(response);
    //     // })
    //     ipc.send('invokeAction', 'someData');
    // });

    //console.log("in login function");
    
//}



