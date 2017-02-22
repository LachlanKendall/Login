// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('chromedriver');


let Config = require('./config.js');

let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

console.log("Inside renderer.js");

module.exports = AsgardLogin = function AsgardLogin() {
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