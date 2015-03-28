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

function lessonNoteController ($scope, $resource){
    var LessnNote = $resource('/api/lessonNote/:id');

    LessnNote.query(function (result) {
        $scope.notes = result;
    });

    $scope.deleteLessonNote = function(note){
        LessonNote.delete({id:note.nid}, function(result){
            if (result.isSuccessful){
                var index = $scope.notes.indexOf(note);
                $scope.notes.splice(index, 1);
            }
        });
    };

    $scope.notes = [];
    $scope.createLessonNote = function () {
        var newLessonNote = new LessonNote();
        newLessonNote.notes = $scope.notes;
        newLessonNote.date = $scope.date;
        newLessonNote.$save(function (result){
            LessonNote.query(function (result){
                $scope.notes = result;
            });
            $scope.notes = '';
            $scope.date = '';
        });

    }
}

angular
.module('inspinia')
.controller('MainCtrl', MainCtrl)
.controller('studentRecordController', studentRecordController);
.controller('lessonNoteController', lessonNoteController);
