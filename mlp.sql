SQLite format 3   @                                                                     -�         u[W                                                                                                                                                                                                                                  ��tableSRecordSRecordCREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, tid INTEGER references Teacher(tid) on delete cascade on update cascade, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, birthday DATE, instrument TEXT, generalNotes TEXT)��tableTeacherTeacherCREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT)P++Ytablesqlite_sequencesqlite_sequenceCREATE TABLE sqlite_sequence(name,seq)��tableAccountAccountCREATE TABLE Account(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, tid INTEGER references Teacher(tid))   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      N %�	xx@gmail.com$2a$10$aP9bVaXPsFb8hlaFgkQmROUCAXS3/3C/4ND4kU8DA4L5smavrA3EC� � ����                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  SRecord	Schedule   	SRecord
	Account
	Teacher   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                %xx@gmail.comxx:   �P� � �; 	%)[�Mlj@gmail.comhwetsgeg34(489) 247-6134Sat Apr 18 2015 00:00:00 GMT-0400 (EDT)segwThis is where notes on student progress should be placed. <b>Hopefully</b> formatting will work.�; 	%)[�M3E@gmail.comhhsgsgesge(837) 451-4353Fri Apr 03 2015 00:00:00 GMT-0400 (EDT)sageThis is where notes on student progress should be placed. <b>Hopefully</b> formatting will work.�= 	')[�Mset@gmail.comhhgswesslgje(487) 603-5523Fri Apr 03 2015 00:00:00 GMT-0400 (EDT)sdgThis is where notes on student progress should be placed. <b>Hopefully</b> formatting will work.�F 	/)[�Mhello89@gmail.comlllfff1 main st(627) 698-3017Fri Apr 03 2015 00:00:00 GMT-0400 (EDT)pianoThis is where notes on student progress should be placed. <b>Hopefully</b> formatting will work. 	#u@gmail.commmkimhaha   [ 	%)[�M67@gmail.comjimsmith1 main st(617) 777-8983Fri Apr 10 2015 00:00:00 GMT-0400i 	#)[u@gmail.comsmithyjimy1 main st(617) 777-8983Fri Apr 10 2015 00:00:00 GMT-0400 (EDT)pianoplease   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   A ==! 	2015-04-01T04:00:00.000Z2015-04-11T17:00:00.594Z15 minutes    s  s`�                                                                                                 ��tableAccountAccountCREATE TABLE Account(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, tid INTEGER references Teacher(tid))P++Ytablesqlite_sequencesqlite_sequenceCREATE TABLE sqlite_sequence(name,seq)��tableTeacherTeacherCREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT)��tableSRecordSRecordCREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, tid INTEGER references Teacher(tid) on delete cascade on update cascade, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, birthday DATE, instrument TEXT, generalNotes TEXT)�e�tableScheduleScheduleCREATE TABLE Schedule(lsid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, lessonTime DATETIME, lessonLength INTEGER, notes TEXT, sid INTEGER references SRecord(sid) on delete cascade on update cascade)