# MusicLessonPlanner

### Version
1.0.0

MusicLessonPlanner is an organizational application for private music teachers that keeps track of their studio of students, lesson notes, schedule, and progress.

The current version can be accessed for use or testing at [320mlp.zenzie.net](http://320mlp.zenzie.net).
This website redirects automatically to IP address
```sh
54.165.8.175:8000
```
Version 1.0.0 includes the following feature:
Add a new student to the list of students by entering the prompted information and clicking the "Save Changes" button at the bottom of the page. After all fields have been entered and the student information has been saved to the database, a summary of the student's record will appear at the top of the page.


### Installation and Build

- Install [node](https://nodejs.org/) and [express](http://expressjs.com/) before running this app.
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
  
To run the app, in your terminal execute:
```sh
$ node app
```
Open your internet browser and go to the localhost:
```sh
localhost:8000
```

### Database Access

The entirety of the database can be found in [./database/mlp.sql](database/mlp.sql).
To run any SQL command you desire on the database, navigate to ./database on your machine and run the script:
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
Additional SQL commands can be found at [http://www.thegeekstuff.com/2012/09/sqlite-command-examples/](http://www.thegeekstuff.com/2012/09/sqlite-command-examples/)


### Bug Tracking

All bugs are monitored under the issues subsection of our GitHub repository. New issues can be added by clicking the green “New Issue” button at the top right of the issues page.

Priority of bugs is determined based on labels with "bug" being the highest priority and "wontfix" being the lowest. Multiple labels can be attached to one bug to create in-between levels of priority.

### Tech

MusicLessonPlanner is built using a derivative of the "MEAN" stack:
* [AngularJS]: for enhanced HTML control
* [Express]: framework for Node.JS
* [node.js]: backend framework
* [Twitter Bootstrap]: CSS styling framework
* [SQLite3]: Database


[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[SQLite3]:https://sqlite.org
