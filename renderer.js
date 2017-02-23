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
    driver.findElement(By.className(' form-submit art-button buttonFont')).click();
    driver.wait(until.elementIsVisible(driver.findElement({ id: 'footerLinks' })), 5000);
    
    // Find interest rate 
    // driver.findElement(By.id('searchSelect')).sendKeys('P');
    // driver.findElement(By.name('searchText')).sendKeys(Config.product);
    // driver.findElement(By.name('searchClient')).click();
    // driver.findElement(By.id('Asgard eWRAP Super Account (AEWS) - Transfers')).click();

    // Access selected client's PV 
    driver.findElement(By.name('searchText')).sendKeys(Config.account);
    driver.findElement(By.name('searchClient')).click();
    driver.findElement(By.id('VIEW')).click();
    driver.findElement(By.id('PORTFOLIO_VALUATION_AQT')).click();
    // Print PV here

    // Move to RoR of client
    driver.findElement(By.id('account_enquiry_menu_select')).sendKeys('R');

    // driver.quit();
    console.log("in Asgard function");
}