/**
* INSPINIA - Responsive Admin Theme
* Copyright 2015 Webapplayers.com
*
*/

/**
* MainCtrl - controller
*/
function MainCtrl() {

  this.userName = 'Example user';
  this.helloText = 'Welcome in SeedProject';
  this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

}

function studentRecordController ($scope, $resource){
    var StudentRecord = $resource('/api/studentRecord/:id');

    StudentRecord.query(function (result) {
        $scope.students = result;
    });

    $scope.deleteStudentRecord = function(student){
        StudentRecord.delete({id:student.sid}, function(result){
            if (result.isSuccessful){
                var index = $scope.students.indexOf(student);
                $scope.students.splice(index, 1);
            }
        });

    };

    $scope.students = [];
    $scope.createStudentRecord = function () {
        var newStudentRecord = new StudentRecord();
        newStudentRecord.firstName = $scope.firstName;
        // alert($scope.firstName);
        newStudentRecord.lastName = $scope.lastName;
        newStudentRecord.instrument = $scope.instrument;
        newStudentRecord.email = $scope.email;
        newStudentRecord.phone = $scope.phone;
        newStudentRecord.address = $scope.address;
        newStudentRecord.birthday = $scope.birthday;
        newStudentRecord.startDate = $scope.startDate;
        newStudentRecord.numberOfLessons = $scope.numberOfLessons;
        newStudentRecord.lessonTime = $scope.lessonTime;
        newStudentRecord.lessonLength = $scope.lessonLength;
        newStudentRecord.generalNotes = $scope.generalNotes;
        newStudentRecord.lessonNotes = $scope.lessonNotes;
        newStudentRecord.$save(function (result){
            StudentRecord.query(function (result){
                $scope.students = result;
            });
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.instrument = '';
            $scope.email = '';
            $scope.phone = '';
            $scope.address = '';
            $scope.birthday = '';
            $scope.startDate = '';
            $scope.numberOfLessons = '';
            $scope.lessonTime = '';
            $scope.lessonLength = '';
            $scope.generalNotes = '';
            $scope.lessonNotes = null;
        });

    }
}

function signinController($scope, $http, $state, store){

    $scope.signin = function(){
        $http.post('/api/signin', {username: $scope.username, password: $scope.password})
        .success(function(data, status, header, config){
            // alert("SIGN-IN-CTRL Recieved " + data.token);
            store.set('token', data.token);
            $state.go('index.main');
        })
        .error(function(data, status, header, config){
            alert(status);
        });
    };
}

function signoutController($scope, $http, $state, store){
    $scope.signout = function(){
        $http.post('/api/signout')
        .success(function(data, status, header, config){
            store.remove('token');
            $state.go('signin');
        })
        .error(function(data, status, header, config){
            alert(status);
        });
    };
}

function signupController($scope, $http, $state, store){
    $scope.signup = function(){
        alert($scope.username);
        $http.post('/api/signup', {username: $scope.username, password: $scope.password})
        .success(function(data,status,header,config){
            alert('success');
            store.set('token', data.token);
            $state.go('index.main');
        })
        .error(function(data,status,header,config){
            alert(status);
        });
    };
}

angular
.module('inspinia')
.controller('MainCtrl', MainCtrl)
.controller('studentRecordController', studentRecordController)
.controller('signinController', signinController)
.controller('signoutController', signoutController)
.controller('signupController', signupController);
