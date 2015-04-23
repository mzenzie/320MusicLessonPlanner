describe('Routing validation', function(){
  /*var dbConnector = require('../../database/dbinit.js');
  dbConnector.init();        
  dbConnector.reinit();
  var db = dbConnector.getInstance();//*/

  describe('Pre-login functionality', function() {
    it('should reach Main, About and support screen', function(){
      browser.get('#/').then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing')});
      browser.get('/#/startpage/about').then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('/#/startpage/about')});
      browser.get('/#/startpage/support').then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('/#/startpage/support')});
      browser.get('#/').then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing')});
      browser.waitForAngular();      
   });

    it('should create an account', function(){
      element(by.buttonText('Create an account')).then(function(){ 
        expect(browser.getCurrentUrl()).toMatch('#/startpage/register')});
      var newName = element(by.model('firstName'));
      var newEmail = element(by.model('username'));
      var newPassword = element(by.model('password'));
      newName.sendKeys('t');
      newEmail.sendKeys('t@t.com');
      newPassword.sendKeys('ttttttt');
      element(by.buttonText('Register')).click()
      browser.waitForAngular();

      }
    });

    it('should login', function(){
      browser.debugger();
      var username = element(by.model('username'));
      var password = element(by.model('password'));
      username.sendKeys('t@t.com');
      password.sendKeys('ttttttt');
      element(by.buttonText('Login')).click()
        .then(function(){ expect(browser.getCurrentUrl()).toMatch('/#/teacher-dashboard/main')});
      browser.waitForAngular();
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
