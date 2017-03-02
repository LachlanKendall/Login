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
    
    // Access selected client's PV 
    driver.findElement(By.name('searchText')).sendKeys(Config.account);
    driver.findElement(By.name('searchClient')).click();
    driver.findElement(By.id('VIEW')).click();
    driver.findElement(By.id('PORTFOLIO_VALUATION_AQT')).click();
    // Print PV here

    // Move to RoR of client
    driver.findElement(By.id('account_enquiry_menu_select')).sendKeys('R');
    driver.findElement(By.name('presetDateRange')).sendKeys('12');
    driver.findElement(By.name('submitAction')).click();


    // driver.quit();
    console.log("in Asgard function");
}

module.exports = AsgardRates = function AsgardRates() {
    var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get(Config.rates);


    console.log("in Asgard rates function");
}

module.exports = AMMRates = function AMMRates() {
    var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get(Config.AMMurl);
    driver.findElement(By.id('authBtn')).click();
    driver.findElement(By.name('txtUserID')).sendKeys(Config.AMMUsername);
    driver.findElement(By.name('txtPassword')).sendKeys(Config.AMMPassword);
    // driver.findElement(By.id('loginBtn')).click();


    console.log("in AMM rates function");
}