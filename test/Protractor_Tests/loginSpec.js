// File: chapter14/simpleRoutingSpec.js

describe('Routing Test', function() {

  it('Should get to login page and login given the correct info', function() {
    // Open the landing page
    browser.get('#/');
      // Ensure that the user was redirected
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/startpage/landing');

    var username = element(by.model('username'));
    var password = element(by.model('password'));
    username.sendKeys('admin@g.com');
    password.sendKeys('1234');
    element(by.buttonText('Login')).click();
     var username = element(by.model('username'));
    var password = element(by.model('password'));
    username.sendKeys('admin@g.com');
    password.sendKeys('1234');
    element(by.buttonText('Login')).click();

    
    //browser.debugger();

  });

  it('Should create a new student', function(){
    //expect(browser.getCurrentUrl()).toEqual('/#/teacher-dashboard/main');
    //browser.debugger();
    //element(by.buttonText('Add New Student')).click();
    //browser.debugger();
    element(by.css('[ng-click="createStudentRecord()"]')).click();
    element(by.model('firstName')).sendKeys('my firstName');
    element(by.model('lastName')).sendKeys('my lastName');
    element(by.model('instrument')).sendKeys('my instrument');
    element(by.model('email')).sendKeys('my email');
    element(by.model('phone')).sendKeys('my phone');
    element(by.model('address')).sendKeys('my address');
    element(by.model('birthday')).sendKeys('1/1/2000');
    element(by.model('startDate')).sendKeys('1/1/2000');
    element(by.model('numberOfLessons')).sendKeys('10');
    element(by.css('[ng-click="ok()"]')).click();
    
  })

  it('Should correctly display new student', function(){
    browser.debugger();
  })




});
