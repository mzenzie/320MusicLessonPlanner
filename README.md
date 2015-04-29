# MusicLessonPlanner

### Version
0.1.2d BETA

MusicLessonPlanner is an organizational application for private music teachers that keeps track of their studio of students, lesson notes, schedule, and progress.

The current version can be accessed for use or testing at [320mlpbeta.zenzie.net](http://320mlpbeta.zenzie.net).
This website redirects automatically to IP address
```sh
http://54.208.4.249:8000/
```
**Features implemented**

- [Add/Delete/View student accounts](https://github.com/mzenzie/320MusicLessonPlanner/wiki/Managing-student-accounts)
- [Teacher Login Authentication](https://github.com/mzenzie/320MusicLessonPlanner/wiki/Create-a-new-teacher-account)
- Lesson Notes - Add/delete/view notes for each lesson and general notes for each student.
- Edit existing student accounts - Allow student information to be updated at any point after the account has already been created.
- Lesson Scheduling - Allow teachers to cancel or reschedule lessons.

**Features in progress**

- UI polishing and bug squashing.
- Server-side check for lesson time conflicts.


### Installation and Build

- Install [python](https://www.python.org/downloads/), [node](https://nodejs.org/), and [express](http://expressjs.com/) before running this app. Make sure that you install python version 2.7
- Navigate to the directory where you wish to install MusicLessonPlanner and clone the repository.
- Navigate into the project directory. 
- Run the install script through whatever shell you use. On most distros, this is
```sh
$ sudo bash install.sh
```
To run the app, in your terminal execute:
```sh
$ node app
```
If you want to run the server persistently (i.e. on a remote server) use the provided command
```sh
$ runapp
```
To later stop the server, use the provided command
```sh
$ stopapp
```

To check that the server is running, open your internet browser and go to the localhost:
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

Testing is implemented using the [Mocha](http://mochajs.org/) testing framework. Within this framework, unit tests use [should](https://github.com/shouldjs/should.js) and some integration tests use [supertest](https://www.npmjs.com/package/supertest) (with some possible overlapping). All test files are located in [./test](./test).

The other integration tests use Protractor, which currently tests Firefox and Chrome. Downloads these browsers to test on them. 

All Unit tests can be run from the root directory with the following command
  ```sh
  $ mocha
  ```
  
The integration tests are run atgit

More detailed testing instructions, and complete Integration tests, look [here](https://github.com/mzenzie/320MusicLessonPlanner/wiki/Testing).

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

0.1.0: Initial BETA version

0.1.1:
  * Added tooltips
  * Added Bug report buttons
  * Preliminary logo and styling for login, registration, about
  * The teacher's name is displayed when logged in.
  * Refactored controllers.js to clean up the code.
  * Added form validation, so no blank fields are allowed.

0.1.2a:
  * Implemented editing student records
  * Implemented editing lesson notes
  * Implemented rescheduling/canceling lessons
  * Fixed today view

0.1.2b:
  * Added a message when the user tries to login with the wrong email/password
  * Added a message when the user tries to create an account with a duplicate email

0.1.2c:
  * Fixed an email validation error
  * Fixed some of the date display problems (The dates being edited still are a bit ugly)

0.1.2d:
  * Fixed the issue with datepicker in editing where the calendar would become non-functional after the first use.
  * Refactored controllers.js to have separate controllers for editing and rescheduling.
  * Replaced the current pagination with a Angular-UI pagination, eliminating some odd errors and improving appearance.

0.1.3 (Pre-release)
  * Hopefully the last BETA version before 1.0.0
  * Changed all of the date input types from text with a BootStrap datepicker to date inputs that use each browser's default method. This will improve user experience on iOS, Android, and Chrome. (iOS for example has its own date picker which most users would expect.)

0.1.3a (Pre-release)
  * Fixed a bug where a dates were not displayed in fields for rescheduling and editing students.


[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[SQLite3]:https://sqlite.org
