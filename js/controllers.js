/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope, $http, $location, $state) {
    $scope.validateLogin = function() {
        alert($state.href("teacher-dashboard.main", {}));
        $state.go('teacher-dashboard.main', {});
    }
}

function studentRecordController($scope, $resource, $modal, $stateParams, $state) {
    var StudentRecord = $resource('/api/studentRecord/:id');


    StudentRecord.query(function(result) {
        $scope.students = result;
    });

    $scope.deleteStudentRecord = function(student) {
        StudentRecord.delete({
            id: student.sid
        }, function(result) {
            if (result.isSuccessful) {
                var index = $scope.students.indexOf(student);
                $scope.students.splice(index, 1);
            }
        });
    };

    $scope.viewStudentRecord = function(student) {
        // var studentRecordParams = $stateParams.student;
        // $scope.state = $state.current;;
        $state.go('index.studentRecordViewPage', {
            student: student
        });
        // $scope.studentRecord = student;
        // alert(student.firstName);
    };

    $scope.editStudentRecord = function(student) {
        // @TODO implement this
    };

    $scope.openModal = function() {

        var createStudentRecordModalInstance = $modal.open({
            templateUrl: 'views/modalStudentRecordCreateForm.html',
            controller: StudentRecordModalInstanceCtrl,
            scope: $scope
        });
    };
};

function TodayViewController($scope, $resource, $modal, $stateParams, $state) {
    var StudentRecord = $resource('/api/studentRecord/:id');

    StudentRecord.query(function(result) {
        $scope.students = result;
    });

    $scope.cancelLesson = function(student) {

        $scope.openModal = function() {

            // var createCancelLessonDialogModalInstance = $modal.open({
            //     templateUrl: 'views/modalStudentRecordCreateForm.html',
            //     controller: ModalInstanceCtrl,
            //     scope: $scope
            // });
        };
        // @TODO cancel current lesson
    }

}

function StudentRecordModalInstanceCtrl($scope, $modalInstance, $resource) {

    $scope.ok = function() {
        var StudentRecord = $resource('/api/studentRecord/:id');
        var newStudentRecord = new StudentRecord();
        newStudentRecord.firstName = $scope.firstName;
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
        newStudentRecord.$save(function(result) {
            StudentRecord.query(function(result) {
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
        $scope.students.push(newStudentRecord);
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('studentRecordController', studentRecordController);
