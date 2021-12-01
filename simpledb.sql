CREATE DATABASE simplescheduler;

--NOTE: I need to research this but current to create the database
--you must copy the line above, copy "\c scheduler", and then copy
--the lines below. Otherwise you will create a database and create
--the below tables in your current (not scheduler) database.

CREATE TABLE reservation(
    reservation_id SERIAL PRIMARY KEY,
    reservation_status INT DEFAULT 0, --Need to decide what each int means or use different data type
    --0: in waitlist, 1: in progress, 3: done
    problem VARCHAR(255) DEFAULT 'general problem', --May want it to be longer
    studentName VARCHAR(255) DEFAULT 'Trinity Student',
    meetingDone BOOLEAN DEFAULT False
);

CREATE TABLE room(
    room_id SERIAL PRIMARY KEY,
    reservation_id int,
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
    room_name VARCHAR (255) DEFAULT 'Trinity Room',
    room_number INT DEFAULT 0
);

CREATE TABLE teacher(
    teacher_id SERIAL PRIMARY KEY,
    room_id int,
    FOREIGN KEY (room_id) REFERENCES room(room_id),
    fullname VARCHAR(255) DEFAULT 'Trinity Instructor',
    email VARCHAR(255) DEFAULT 'instructor@trinity.edu'
);
