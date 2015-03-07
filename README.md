# MusicLessonPlanner

### Version
1.0.0

MusicLessonPlanner is an organizational application for private music teachers that keeps track of their studio of students, lesson notes, schedule, and progress.

The current version can be accessed for use or testing at [320mlp.zenzie.net](http://320mlp.zenzie.net).
This website redirects automatically to IP address
```sh
54.165.8.175:8000
```

### Installation and Build

- Install [node](https://nodejs.org/) and [express](http://expressjs.com/) before running this app.
- Navigate to the directory where you wish to install the software and clone the repository using the link provided by GitHub
- Before running the app make sure you have the necessary dependencies installed:
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


### Bug Tracking

All bugs are monitored under the issues subsection of our GitHub repository. New issues can be added by clicking the green “New Issue” button at the top right of the issues page.

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
