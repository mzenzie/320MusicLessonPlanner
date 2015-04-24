"use strict";

//////////////////////////////////////////////////////////////////////////////////////
//   These are the page objects representing elements corresponding to a given page
//   And the related actions one might perform on that page. They have asserts
//   into them, so simply calling them within in "it" block will test its functionality

// This represents the starting page, and all pages you can reach without logging in
var StartPage = function(){

  // These are the buttons and fields on the starting page
  this.CreateAccountButton = element(by.buttonText('Create an account'));
  this.UserNameField = element(by.model('username'));
  this.PasswordField = element(by.model('password'));   
  this.LoginButton =   element(by.buttonText('Login'));

  // This goes the account creation page
  this.ClickCreateAccount = function(){
    CreateAccountButton.then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('#/startpage/register')});
  };

  // This fills in the related fields and clicks Login
  this.SendLoginInfo = function(email, password){
    username.sendKeys(email);
    password.sendKeys(password);
    LoginButton.click()
        .then(function(){ expect(browser.getCurrentUrl()).toMatch('/#/teacher-dashboard/main')});
  };

  // This routes between the the Startpage, the About page and Support page and ensures they route correctly
  this.TeststartPageRouting = function(){
    browser.get('#/').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/start')});
    browser.get('/#/startpage/about').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/about')});
    browser.get('/#/startpage/support').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/support')});
    browser.get('#/').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/start')});
  };
};

// New Teacher registration page
var RegisterTeacherPage = function(){
    this.NameField = element(by.model("firstName"));
    this.EmailField = element(by.model("username"));
    this.PasswordField = element(by.model("password"));
    this.RegisterButton = element(by.buttonText('Register'));

    // Fills in your account info and clicks register
    this.CreateAccount = function(name, email, password){      
      UserNameField.sendKeys(name);
      EmailField.sendKeys(email);
      PasswordField.sendKeys(password);
      RegisterButton.click()
        .then(function(){expect(browser.getCurrentUrl()).toMatch('/#/startpage/start')});
};

// This is the default page when you log in.
var DashboardPage = function(){
  var newStudentButton = element(by.buttonText("New Student"));
  var studentSaveButton = element(by.buttonText("Save"));
  var studentCancelButton = element(by.buttonText("Cancel"));

  // Routes to all available pages
  this.TestDashboardRouting = function(){
    browser.get('#/teacher-dashboard/about').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/about')});
    browser.get('#/teacher-dashboard/support').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/support')});
    browser.get('#/teacher-dashboard/main').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/main')});
  };

  // Enters the given fields into Add Student creation
  this.EnterStudentInfo = function(fname, lname, instrument, email, phone, address, bday, startDate, numberOfLessons){
    newStudentButton.click().then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/createStudentRecord')});
    element(by.model('firstName')).sendKeys(fname);
    element(by.model('lastName')).sendKeys(lname);
    element(by.model('instrument')).sendKeys(instrument);
    element(by.model('email')).sendKeys(email);
    element(by.model('phone')).clear().then(function(){element(by.model('phone')).sendKeys(phone);});
    element(by.model('address')).sendKeys(address);
    element(by.model('birthday')).sendKeys(bday);
    element(by.model('startDate')).sendKeys(startDate);
    element(by.model('numberOfLessons')).sendKeys(numberOfLessons);
  };

  // This clicks Save when creating a student. It asserts that all information is correct
  this.SaveCorrectStudentInfo = function(){
    studentSaveButton.click().then(function(){expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/main')});
  };

  // Call this to assert incorrect data doesn't result in a new student
  this.SaveIncorrectStudentInfo = function(){
    studentSaveButton.click().then(function(){expect(browser.getCurrentUrl()).not.toMatch('#/teacher-dashboard/main')});
  };

  // Routes to logout
  this.Logout = function(){
    browser.get('#/').then(function(){ 
      expect(browser.getCurrentUrl()).toMatch('/#/startpage/start')});
  };
  
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
///      This is where the integration tests are run
/////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Routing validation', function(){

  describe('Startpage functionality', function() {
    it('should reach Main, About and support screen', function(){      
      Startpage.TeststartPageRouting(); 
      browser.debugger();
   });
    it('should create an account and return to login', function(){      
      Startpage.ClickCreateAccount();
      RegisterTeacherPage.CreateAccount('Test Name', 'test@gmail.com', 'testpassword');
      browser.debugger();
    });
    it('should login', function(){   
      Startpage.SendLoginInfo('test@gmail.com', 'testpassword');
      browser.debugger();
    });
  });

  describe('start page functionality', function(){
    it('should create a student record', function(){
      
      DashboardPage.TestDashboardRouting
      //fname, lname, instrument, email, phone, address, bday, startDate, numberOfLessons
      DashboardPage.EnterStudentInfo('fname', 'lname', 'instrument', 
      
      browser.waitForAngular();
      browser.debugger();
      element(by.css('[ng-click="ok()"]')).click();
      browser.debugger();
    });

    it('should visit calendar', function(){
      browser.get('#/teacher-dashboard/calendar')
      .then(function(){expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/calendar')});
    });

    it('should logout correctly', function(){
  
    });
  });

  
});
