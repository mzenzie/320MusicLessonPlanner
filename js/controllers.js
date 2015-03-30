/**
 * MainCtrl - controller
 */
function MainCtrl($scope, $http, $location, $state) {
    // $scope.validateLogin = function() {
    //     alert($state.href("teacher-dashboard.main", {}));
    //     $state.go('teacher-dashboard.main', {});
    // }
}

/**
 *     teacherController
 *     Handles deleting, viewing, and editing student records.
 */

function teacherController($scope, $resource, $stateParams, $state, $modal, getStudent, $log) {

    //  Gets the list of students

    var StudentRecord = $resource('/api/studentRecord/');

    StudentRecord.query(function(result) {
        $scope.students = result;
    });

    //  Delete student record

    $scope.confirmDeleteStudent = false;
    $scope.deleteStudentRecord = function(student) {
        var modalInstance = $modal.open({
            templateUrl: 'views/deleteConfirmModal.html',
            controller: ModalDeleteStudentCtrl,
            size: 'sm',
            resolve: {
                confirmDeleteStudent: function() {
                    return $scope.confirmDeleteStudent;
                }
            }
        });
        modalInstance.result.then(function(confirmDeleteStudent) {
            $scope.confirmDeleteStudent = confirmDeleteStudent;
            $log.debug("Confirm Delete status: " + $scope.confirmDeleteStudent);
            if ($scope.confirmDeleteStudent) {
                StudentRecord.delete({
                    id: student.sid
                }, function(result) {
                    if (result.isSuccessful) {
                        var index = $scope.students.indexOf(student);
                        $scope.students.splice(index, 1);
                    }
                });
            };
        });
    };

    //  View student record

    $scope.viewStudentRecord = function(student) {
        $log.debug('Viewing student record id: ' + student.sid);
        var studentParams = {
            sid: student.sid,
            firstName: student.firstName,
            lastName: student.lastName,
        };
        $log.debug('studentParams id: ' + studentParams.lastName);

        //  Use the getStudent service to pass the $scope to StudentRecordCtrl
        getStudent.initializeStudentData(student);
        $state.go('teacher-dashboard.viewStudentRecord/:sid/:firstName/:lastName', studentParams);
    };

    //  Edit student record

    $scope.editStudentRecord = function(student) {
        // @TODO implement this
    };

    //  Add student record

    $scope.createStudentRecord = function() {
        $state.go('teacher-dashboard.createStudentRecord');
    };
};

/**
 *      ModalDeleteStudentCtrl
 *      Displays a modal window to confirm or cancel deletion of a student record
 */

function ModalDeleteStudentCtrl($scope, $modalInstance) {

    $scope.ok = function() {
        $scope.confirmDeleteStudent = true;
        $modalInstance.close($scope.confirmDeleteStudent);
    };

    $scope.cancel = function() {
        $scope.confirmDeleteStudent = false;
        $modalInstance.close($scope.confirmDeleteStudent);
        // $modalInstance.dismiss('cancel');
    };
};

/**
 *      StudentRecordCtrl
 *      Controller for the student record viewing page.
 *      Necessary to pass the variable scope of a specific student to the new page.
 */
function StudentRecordCtrl($scope, $resource, $state, $stateParams, getStudent, $log) {
    $log.debug('StudentRecordCtrl called, $stateParams.sid = ' + $stateParams.sid);
    var StudentRecord = $resource('/api/studentRecord/:id');
    StudentRecord.query(function(result) {
        $scope.students = result;
    });
    //  Set individual student scopes
    $scope.firstName = $stateParams.firstName;
    $scope.lastName = $stateParams.lastName;
    $scope.instrument = $stateParams.instrument;

    //  Use the getStudent service to receive the $scope from teacherController
    $scope.student = getStudent.getStudentRecord();

    $log.debug('StudentRecordCtrl firstName: ' + $scope.student.firstName);

};

function getStudent() {
    return {};
};

/**
 *     StudentRecordCreationCrtl
 *     Controller for the Add student record form. The edit form will be similar.
 */
function StudentRecordCreationCrtl($scope, $resource, $state, $log) {
    var StudentRecord = $resource('/api/studentRecord/');

    StudentRecord.query(function(result) {
        $scope.students = result;
    });

    /*
     *       TIME PICKER CODE       ****************************
     */
    $scope.lessonTime = new Date();
    $scope.lessonTime.setMinutes(00);
    $scope.lessonTime.setSeconds(00);

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.lessonTime = d;
    };

    $scope.changed = function() {
        $log.log('Time changed to: ' + $scope.lessonTime);
    };

    $scope.clear = function() {
        $scope.lessonTime = null;
    };
    //      *******************************************************

    //      Temp General Notes:
    $scope.generalNotes = "This is where notes on student progress should be placed. <b>Hopefully</b> formatting will work.";

    /*
     *       SUBMIT FORM
     */

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
        $log.debug('Birthday returned: ' + newStudentRecord.birthday);
        newStudentRecord.startDate = $scope.startDate;
        $log.debug('Starting date returned: ' + newStudentRecord.startDate);
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
        $state.go('teacher-dashboard.main');
    };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

    $scope.cancel = function() {
        $state.go('teacher-dashboard.main');
    };

    /*
     *       DATE PICKER CODE
     */


    $scope.openBirthday = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedBirthday = true;
    };

    $scope.openStartDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedStartDate = true;
    };
};

/**
 *      TodayViewController
 *      Controller for the today view.
 *      Will get a list of lessons scheduled for today and displays them
 *      Will also handle canceling and rescheduling lessons.
 */
function TodayViewController($scope, $resource, $modal, $stateParams, $state) {
    var StudentRecord = $resource('/api/studentRecord/:id');

    StudentRecord.query(function(result) {
        $scope.students = result;
    });

    $scope.cancelLesson = function(student) {

        $scope.openModal = function() {

        };
        // @TODO cancel current lesson
    };
};

/**
 * CalendarCtrl - Controller for Calendar
 * Store data events for calendar
 * This is not finished yet!!!!
 */
function CalendarCtrl($scope) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // Events
    $scope.events = [{
        title: 'All Day Event',
        start: new Date(y, m, 1)
    }, {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
    }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
    }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
    }, {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
    }, {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/'
    }];


    /* message on eventClick */
    $scope.alertOnEventClick = function(event, allDay, jsEvent, view) {
        $scope.alertMessage = (event.title + ': Clicked ');
    };
    /* message on Drop */
    $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = (event.title + ': Droped to make dayDelta ' + dayDelta);
    };
    /* message on Resize */
    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = (event.title + ': Resized to make dayDelta ' + minuteDelta);
    };

    /* config object */
    $scope.uiConfig = {
        calendar: {
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

function loginCtrl($state, $scope, $http, store) {
    $scope.signin = function() {
        $http.post('/api/signin', {
                username: $scope.username,
                password: $scope.password
            })
            .success(function(data, status, header, config) {
                // alert("SIGN-IN-CTRL Recieved " + data.token);
                store.set('token', data.token);
                $state.go('teacher-dashboard.main');
            })
            .error(function(data, status, header, config) {
                alert('Incorrect user name or password.');
            });
    };
    $scope.signout = function() {
        $http.post('/api/signout')
            .success(function(data, status, header, config) {
                store.remove('token');
                $state.go('startpage.landing');
            })
            .error(function(data, status, header, config) {
                alert('Sign out failed. How does that happen!!!??!?!');
            });
    };
    $scope.signup = function() {
        // alert($scope.username);
        $http.post('/api/signup', {
                username: $scope.username,
                password: $scope.password
            })
            .success(function(data, status, header, config) {
                alert('success');
                store.set('token', data.token);
                $state.go('startpage.landing');
            })
            .error(function(data, status, header, config) {
                alert('Invalid input.');
            });
    };
};


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



/**
 *      Service (like a factory) and Controller instantiation.
 */
angular
    .module('inspinia')
    .service('getStudent', [function() {
        var studentData = {};

        var initializeStudentData = function(student) {
            studentData = student;
        }

        var getStudentRecord = function() {
            return studentData;
        }

        return {
            initializeStudentData: initializeStudentData,
            getStudentRecord: getStudentRecord
        };
    }])
    .controller('MainCtrl', MainCtrl)
    .controller('teacherController', teacherController)
    .controller('TodayViewController', TodayViewController)
    .controller('StudentRecordCtrl', StudentRecordCtrl)
    .controller('CalendarCtrl', CalendarCtrl)
    .controller('loginCtrl', loginCtrl);


    // =======
//         $http.post('/api/signin', {username: $scope.username, password: $scope.password})
//         // $http.post('/api/signin', {username: 'admin@g.com', password: '1234'})
//         .success(function(data, status, header, config){
//             // alert("SIGN-IN-CTRL Recieved " + data.token);
//             store.set('token', data.token);
//             alert("going to teacher-dashboard");
//             $state.go('teacher-dashboard.main');
//         })
//         .error(function(data, status, header, config){
//             alert(data);
//             alert(status);
//             alert(header);
//             alert(config);
//             alert('Incorrect user name or password.');
//         });
//     };
//     $scope.signout = function() {
//         $http.post('/api/signout')
//         .success(function(data, status, header, config){
//             store.remove('token');
//         $state.go('startpage.landing');
//         })
//         .error(function(data, status, header, config){
//             alert('Sign out failed. How does that happen!!!??!?!');
//         });
//     };
//     $scope.signup = function(){
//         // alert($scope.username);
//         $http.post('/api/signup', {username: $scope.username, password: $scope.password})
//         .success(function(data,status,header,config){
//             alert('success');
//             store.set('token', data.token);
//             $state.go('startpage.landing');
//         })
//         .error(function(data,status,header,config){
//             alert('Invalid input.');
//         });
//     };
// }
