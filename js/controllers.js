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

/**
 * CalendarCtrl - Controller for Calendar
 * Store data events for calendar
 */
function CalendarCtrl($scope) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // Events
    $scope.events = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];


    /* message on eventClick */
    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
        $scope.alertMessage = (event.title + ': Clicked ');
    };
    /* message on Drop */
    $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = (event.title +': Droped to make dayDelta ' + dayDelta);
    };
    /* message on Resize */
    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = (event.title +': Resized to make dayDelta ' + minuteDelta);
    };

    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };

    /* Event sources array */
    $scope.eventSources = [$scope.events];
}

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('studentRecordController', studentRecordController)
    .controller('TodayViewController', TodayViewController)
    .controller('CalendarCtrl', CalendarCtrl);

