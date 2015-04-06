# MusicLessonPlanner

### Version
0.1.1 BETA

MusicLessonPlanner is an organizational application for private music teachers that keeps track of their studio of students, lesson notes, schedule, and progress.

The current version can be accessed for use or testing at [320mlpbeta.zenzie.net](http://320mlpbeta.zenzie.net).
This website redirects automatically to IP address
```sh
54.165.8.175:8000
```
**Features implemented**

- [Add/Delete/View student accounts](https://github.com/mzenzie/320MusicLessonPlanner/wiki/Managing-student-accounts)
- [Teacher Login Authentication](https://github.com/mzenzie/320MusicLessonPlanner/wiki/Create-a-new-teacher-account)

**Features in progress**

- Lesson Notes - Add/delete/view notes for each lesson and general notes for each student.
- Edit existing student accounts - Allow student information to be updated at any point after the account has already been created.
- Edit/View teacher account information - Allow teachers to view, modify, or update their account information after creating already having created an account.
- Lesson Scheduling - Integrate Google API to allow teachers to schedule lessons and make updates to existing lessons.


### Installation and Build

- Install [python](https://www.python.org/downloads/), [node](https://nodejs.org/), and [express](http://expressjs.com/) before running this app.
- Navigate to the directory where you wish to install MusicLessonPlanner and clone the repository.
- Make sure you have the necessary dependencies installed:
  - project dependencies
  ```sh
  $ sudo npm install
  ```
  - sqlite3
  ```sh
  $ sudo npm install sqlite3 --save
  ```
  - bcrypt
  ```sh
  $ sudo npm install bcrypt
  ```
  NOTE: This package is rather finicky. Make sure you are using python 2.7
  
To run the app, in your terminal execute:
```sh
$ node app
```
Open your internet browser and go to the localhost:
```sh
localhost:8000
```

### Database Access

The entirety of the database can be found in [./mlp.sql](mlp.sql).
To run any SQL command you desire on the database, navigate to [./database](./database) on your machine and run the script:
```sh
$ python dbtest.py
``` 
Here are some possible commands you may want to execute...

*Note: you will need to execute* python dbtest.py *before each new SQL command.*

The following command creates a table with two columns, one for text, one for integers.
```sh
$ create table example(text, INTEGER)
``` 
To insert a set of values into a preexisting table
```sh
$ insert into example values('hello', 101)
``` 
You can also view information stored in an existing table by executing
```sh
$ select * from example
``` 
Additional SQL commands can be found [here](http://www.thegeekstuff.com/2012/09/sqlite-command-examples/)

### Testing

Testing is implemented using the [Mocha](http://mochajs.org/) testing framework. Within this framework, unit tests use [should](https://github.com/shouldjs/should.js) and integration tests use [supertest](https://www.npmjs.com/package/supertest) (with some possible overlapping). All test files are located in [./test](./test).

When beginning testing for the first time you will need to install the testing dependencies. All of the necessary dependencies can be installed by executing
  ```sh
  $ ./install_test_dependencies
  ```
If the above command does not work, you may need to re-run with admin privileges
  ```sh
  $ sudo ./install_test_dependencies
  ```
All tests can be run from the root directory with the following command
  ```sh
  $ mocha
  ```
More detailed testing instructions can be found [here](https://github.com/mzenzie/320MusicLessonPlanner/wiki/Testing).

For integration tests install [Protractor](https://github.com/angular/protractor), start the app
  ```sh
  $ node app
  ```
and run the test
  ```sh
  $ protractor test/Protractor_Tests/protractor.conf.js
  ```
or  
  ```sh
  $ protractor debug test/Protractor_Tests/protractor.conf.js
  ```
which allows you to explore the browser as it happens and step through code by entering 'c'

### Bug Tracking

All bugs are monitored [here](https://github.com/mzenzie/320MusicLessonPlanner/issues) under the issues subsection of our GitHub repository. New issues can be added by clicking the green “New Issue” button at the top right of the issues page.

Priority of bugs is determined by labels with "bug" being the highest priority and "wontfix" being the lowest. Multiple labels can be attached to one bug to create in-between levels of priority.

### Tech

MusicLessonPlanner is built using a derivative of the "MEAN" stack:
* [AngularJS]: for enhanced HTML control
* [Express]: framework for Node.JS
* [node.js]: backend framework
* [Twitter Bootstrap]: CSS styling framework
* [SQLite3]: Database

### Change Log

-0.1.0: Initial BETA version
-0.1.1:
  * Added tooltips
  * Added Bug report buttons
  * Preliminary logo and styling for login, registration, about
  * The teacher's name is displayed when logged in.
  * Refactored controllers.js to clean up the code.
  * Added form validation, so no blank fields are allowed.


[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[SQLite3]:https://sqlite.org
