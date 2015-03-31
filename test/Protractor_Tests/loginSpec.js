// File: chapter14/simpleRoutingSpec.js

describe('Routing Test', function() {

  it('should show teams on the first page', function() {
    // Open the landing page
    browser.get('#/');
      // Ensure that the user was redirected
    expect(browser.getCurrentUrl())
        .toEqual('http://localhost:8000/#/startpage/landing');
    var username = element(
      by.model('username'));
    var password = element(
      by.model('password'));
    username.sendKeys('admin@g.com');
    password.sendKeys('1234');
    element(by.buttonText('Login')).click()
    //browser.driver.switchTo().alert().sendKeys('\n');
    
    browser.debugger();

  });
  browser.debugger();
  /*

  it('should allow logging in', function() {
    // Navigate to the login page
    browser.get('#/login');

    var username = element(
      by.model('loginCtrl.user.username'));
    var password = element(
      by.model('loginCtrl.user.password'));

    // Type in the username and password
    username.sendKeys('admin');
    password.sendKeys('admin');



  });*/
});
