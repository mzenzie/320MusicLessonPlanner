"use strict";
var LandingPage = function(){
  this.CreateAccountButton = element(by.buttonText('Create an account'));
  this.UserNameField = element(by.model('username'));
  this.PasswordField = element(by.model('password'));   
  this.LoginButton =   element(by.buttonText('Login'))
      
  this.ClickCreateAccount = function(){
    CreateAccountButton.then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('#/startpage/register')});
  };

  this.SendLoginInfo = function(email, password){
    username.sendKeys('t@t.com');
    password.sendKeys('ttttttt');
    LoginButton.click()
        .then(function(){ expect(browser.getCurrentUrl()).toMatch('/#/teacher-dashboard/main')});
  };

  this.TestLandingPageRouting = function(){
    browser.get('#/').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing')});
    browser.get('/#/startpage/about').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/about')});
    browser.get('/#/startpage/support').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/support')});
    browser.get('#/').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing')});
  };
};

var RegisterPage = function(){
  this.NameField = element(by.model("firstName"));
  this.EmailField = element(by.model("username"));
  this.PasswordField = element(by.model("password"));
  this.RegisterButton = element(by.buttonText('Register'));

  this.CreateAccount = function(name, email, password){
    
    UserNameField.sendKeys(name);
    EmailField.sendKeys(email);
    PasswordField.sendKeys(password);
    RegisterButton.click()
      .then(function(){expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing')});

};


describe('Routing validation', function(){
  /*var dbConnector = require('../../database/dbinit.js');
  dbConnector.init();        
  dbConnector.reinit();
  var db = dbConnector.getInstance();//*/

  describe('Pre-login functionality', function() {
    it('should reach Main, About and support screen', function(){      
      LandingPage.TestLandingPageRouting(); 
   });

    it('should create an account', function(){      
      LandingPage.ClickCreateAccount();
      
    });

    it('should login', function(){
     
      browser.debugger();
    });
  });

  describe('Landing page functionality', function(){
    it('should create a student record', function(){
      
      browser.get('#/teacher-dashboard/createStudentRecord').then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/createStudentRecord')});
      browser.debugger();
      browser.waitForAngular();
      element(by.model('firstName')).sendKeys('testFirstName');
      element(by.model('lastName')).sendKeys('testLastName');
      element(by.model('instrument')).sendKeys('my instrument');
      element(by.model('email')).sendKeys('dscarlso@umass.edu');
      element(by.model('phone')).clear().then(function(){element(by.model('phone')).sendKeys('1234567890');});
      element(by.model('address')).sendKeys('my address');
      element(by.model('birthday')).sendKeys('1/1/2000');
      element(by.model('startDate')).sendKeys('1/1/2000');
      element(by.model('numberOfLessons')).sendKeys('10');
      browser.waitForAngular();
      browser.debugger();
      element(by.css('[ng-click="ok()"]')).click();
      browser.debugger();
    });
    it('should visit calendar', function(){
      browser.get('#/teacher-dashboard/calendar')
      .then(function(){expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/calendar')});
    });
       /* <button class="btn btn-w-m btn-white" ng-click="signout()" tooltip-placement="bottom" tooltip="Log out of your account.">
                    <i class="fa fa-sign-out"></i> Log out
                </button>*/

    it('should logout correctly', function(){
      browser.get('#/').then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing')});
    });
  });

  
});
