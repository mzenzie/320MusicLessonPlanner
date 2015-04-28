"use strict";

//////////////////////////////////////////////////////////////////////////////////////
//   These are the page objects representing elements corresponding to a given page
//   And the related actions one might perform on that page. They have asserts
//   into them, so simply calling them within in "it" block will test its functionality

// This represents the starting page, and all pages you can reach without logging in
var StartPage = function () {
   
   // These are the buttons and fields on the starting page
   //this.CreateAccountButton = element(by.linkText("Create an account"));
   //this.UserNameField = element(by.model('username'));
   //this.PasswordField = element(by.model('password'));   
   //this.LoginButton =   element(by.buttonText('Login'));
   
   // This goes the account creation page
   this.ClickCreateAccount = function () {
      //browser.debugger();
      element(by.linkText("Create an account")).click().then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/startpage/register')
      });
   };
   
   // This fills in the related fields and clicks Login
   this.SendLoginInfo = function (email, password) {
      //browser.debugger();
      element(by.model('username')).sendKeys(email);
      element(by.model('password')).sendKeys(password);
      browser.debugger();
      console.log("Creating a new teacher account: " + email);
      element(by.buttonText('Login')).click()
        .then(function () { expect(browser.getCurrentUrl()).toMatch('/#/teacher-dashboard/main') });
   };
   
   // This routes between the the Startpage, the About page and Support page and ensures they route correctly
   this.TestStartPageRouting = function () {
      browser.get('#/').then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/startpage/landing')
      });
      browser.get('/#/startpage/about').then(function () {
         expect(browser.getCurrentUrl()).toMatch('/#/startpage/about')
      });
      browser.get('/#/startpage/support').then(function () {
         expect(browser.getCurrentUrl()).toMatch('/#/startpage/support')
      });
      browser.get('#/').then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/startpage/landing')
      });
   };
};

// New Teacher registration page
var RegisterTeacherPage = function () {
   //this.NameField = element(by.model("firstName"));
   //this.EmailField = element(by.model("username"));
   //this.PasswordField = element(by.model("password"));
   //this.RegisterButton = element(by.buttonText('Register'));
   
   // Fills in your account info and clicks register
   this.CreateAccount = function (name, email, password) {
      expect(browser.getCurrentUrl()).toMatch('#/startpage/register');
      element(by.model("firstName")).sendKeys(name);
      //NameField.sendKeys(name);
      element(by.model("username")).sendKeys(email);
      element(by.model("password")).sendKeys(password);
      //browser.debugger();
      element(by.buttonText('Register')).click();
      //.then(function(){expect(browser.getCurrentUrl()).toMatch('/#/startpage/start')});
   };
};


// This is the default page when you log in.
var DashboardPage = function () {
   
   // Routes to all available pages
   this.TestDashboardRouting = function () {
      browser.get('#/teacher-dashboard/about').then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/about')
      });
      browser.get('#/teacher-dashboard/support').then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/support')
      });
      browser.get('#/teacher-dashboard/main').then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/main')
      });
   };
   
   // Enters the given fields into Add Student creation
   this.EnterStudentInfo = function (fname, lname, instrument, email, phone, address, bday, startDate, numberOfLessons) {
      element(by.model('firstName')).sendKeys(fname);
      element(by.model('lastName')).sendKeys(lname);
      element(by.model('instrument')).sendKeys(instrument);
      element(by.model('email')).sendKeys(email);
      //browser.debugger();
      element(by.model('phone')).clear().then(function () { element(by.model('phone')).sendKeys(phone) });
      //browser.debugger();
      element(by.model('address')).sendKeys(address);
      //element(by.model('birthday')).sendKeys(bday);
      //element(by.model('startDate')).sendKeys(startDate);
      element(by.model('numberOfLessons')).sendKeys(numberOfLessons);
   };
   
   this.ClickCreateStudent = function () {
      //browser.debugger();
      element(by.buttonText("New Student")).click().then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/createStudentRecord');
      });
   };
   
   this.CancelStudentInfo = function () {
      element(by.buttonText("Cancel")).click().then(function () {
         expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/main');
      });
   };
   
   // This clicks Save when creating a student. It asserts that all information is correct
   this.SaveCorrectStudentInfo = function () {
      element(by.buttonText("Save")).click().then(function () { expect(browser.getCurrentUrl()).toMatch('#/teacher-dashboard/main') });
   };
   
   // Call this to assert incorrect data doesn't result in a new student
   this.SaveIncorrectStudentInfo = function () {
      element(by.buttonText("Save")).click().then(function () { expect(browser.getCurrentUrl()).not.toMatch('#/teacher-dashboard/main') });
   };
   
   this.EnsureStudentWasCreated = function (lname, fname, instrument, rowNum) {
      element(by.repeater('student in students').row(rowNum)).getText()
            .then(function (row) { expect(row).toMatch(lname + ', ' + fname + ' ' + instrument); });
   }
   
   // Routes to logout
   this.Logout = function () {
        /*
       browser.get('#/').then(function() {
           expect(browser.getCurrentUrl()).toMatch('/#/startpage/landing');
       };*/
        // browser.get('#/').then(function () {expect(browser.getCurrentUrl)});
        //expect(browser.getCurrentUrl()).toMat
        //browser.get
   };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
///      This is where the integration tests are run
/////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Routing validation', function () {
   //Set the browser name
   /*
   browser.getCapabilities().then(function (cap) {
      browser.browserName = cap.caps_.browserName;
   });*/
    var emailName = 'Chrome@Chrome.com';
   
   describe('Startpage functionality', function () {
      //browser.debugger();
      //console.log(Date.now());
      var startPage = new StartPage();
      it('should reach Main, About and support screen', function () {
         //browser.debugger();
         startPage.TestStartPageRouting();
      });
      it('should create an account and return to login', function () {
         //browser.debugger();
         startPage.ClickCreateAccount();
         
         var registerPage = new RegisterTeacherPage();
         browser.waitForAngular();
         registerPage.CreateAccount('Test Name', emailName, 'testpassword');
         browser.debugger();
      });
      it('should login', function () {
         browser.waitForAngular();
         startPage.SendLoginInfo(emailName, 'testpassword');
      });
   });
   
   
   describe('Dashboard functionality', function () {
      var dashPage = new DashboardPage();
      
      it('should route to pages reachable from dashboard', function () {
         //browser.debugger();
         dashPage.TestDashboardRouting();
      });
      
      it('Should create a new student', function () {
         //(fname, lname, instrument, email, phone, address, bday, startDate, numberOfLessons)
         //browser.debugger();
         //Create a student with invalid email
         dashPage.ClickCreateStudent();
         dashPage.EnterStudentInfo('fname', 'lname', 'instrument', 'bademail', '1234567890', 'address', '1/1/2000', '1/2/2000', 1);
         dashPage.SaveIncorrectStudentInfo();
         dashPage.CancelStudentInfo();
         //browser.debugger();
         dashPage.ClickCreateStudent();
         dashPage.EnterStudentInfo('fname', 'lname', 'instrument', 'test@test.com', '1234567890', 'address', '1/1/2000', '1/2/2000', 1);
         //browser.debugger();
         dashPage.SaveCorrectStudentInfo();
         browser.waitForAngular();
         browser.debugger();
         //dashPage.EnsureStudentWasCreated('lname', 'fname', 'instrument', 0);
         browser.waitForAngular();
         console.log('Chrome testing is finished');
         browser.debugger();
      });

   });

});
