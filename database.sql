CREATE DATABASE scheduler;

--NOTE: I need to research this but current to create the database
--you must copy the line above, copy "\c scheduler", and then copy
--the lines below. Otherwise you will create a database and create
--the below tables in your current (not scheduler) database.

CREATE TABLE reservation(
    reservation_id SERIAL PRIMARY KEY,
    reservation_status INT, --Need to decide what each int means or use different data type
    problem VARCHAR(255), --May want it to be longer
    checkedIn BOOLEAN,
    meetingDone BOOLEAN,
    timeIn TIMESTAMP
);

CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE room(
    room_id SERIAL PRIMARY KEY,
    reservation_id int,
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
    room_name VARCHAR (255),
    room_number INT
);

CREATE TABLE teacher(
    teacher_id SERIAL PRIMARY KEY,
    room_id int,
    FOREIGN KEY (room_id) REFERENCES room(room_id),
    fullname VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE has_reservation(
    PRIMARY KEY (reservation_id,student_id),
    reservation_id int,
    student_id int,
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);