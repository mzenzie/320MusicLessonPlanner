describe('Routing validation', function(){

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
   });

    it('should login', function(){
      var username = element(by.model('username'));
      var password = element(by.model('password'));
      username.sendKeys('admin@g.com');
      password.sendKeys('1234');
      element(by.buttonText('Login')).click()
        .then(function(){ expect(browser.getCurrentUrl()).toMatch('/#/teacher-dashboard/main')});
      //browser.debugger();
    });
  });

  describe('Landing page functionality', function(){
    it('should create a student record', function(){
      element(by.buttonText('Add New Student')).click();
      //browser.debugger();
      element(by.model('firstName')).sendKeys('testFirstName');
      element(by.model('lastName')).sendKeys('testLastName');
      element(by.model('instrument')).sendKeys('my instrument');
      element(by.model('email')).sendKeys('dscarlso@umass.edu');
      element(by.model('phone')).clear().then(function(){element(by.model('phone')).sendKeys('1234567890');});
      element(by.model('address')).sendKeys('my address');
      element(by.model('birthday')).sendKeys('1/1/2000');
      element(by.model('startDate')).sendKeys('1/1/2000');
      element(by.model('numberOfLessons')).sendKeys('10');
       //browser.debugger();
      element(by.css('[ng-click="ok()"]')).click();
      browser.debugger();
    });
  });

  
});
/*
describe('Routing Test', function() {

  it('Should create a new student', function(){
    
    //expect(browser.getCurrentUrl()).toEqual('/#/teacher-dashboard/main');
    //browser.debugger();

    
  })

  it('Should correctly display new student', function(){
    browser.debugger();
  })
});*/
