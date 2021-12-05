CREATE DATABASE simplescheduler;

--NOTE: I need to research this but current to create the database
--you must copy the line above, copy "\c scheduler", and then copy
--the lines below. Otherwise you will create a database and create
--the below tables in your current (not scheduler) database.

CREATE TABLE reservation(
    reservation_id SERIAL PRIMARY KEY,
    room_id int, 
    FOREIGN KEY (room_id) REFERENCES room(room_id),
    reservation_status INT DEFAULT 0, --Need to decide what each int means or use different data type
    --1: in waitlist, 2: in progress, 3: done
    problem VARCHAR(255) DEFAULT 'general problem', --May want it to be longer
    studentName VARCHAR(255) DEFAULT 'Trinity Student',
    meetingDone BOOLEAN DEFAULT False
);

CREATE TABLE room(
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR (255) DEFAULT 'Office Hours',
    room_number INT DEFAULT 0
    --should probably add room building
);

CREATE TABLE teacher(
    teacher_id SERIAL PRIMARY KEY,
    room_id int,
    FOREIGN KEY (room_id) REFERENCES room(room_id),
    fullname VARCHAR(255) DEFAULT 'Trinity Instructor',
    email VARCHAR(255) DEFAULT 'instructor@trinity.edu'
);

CREATE TABLE scoreboard(
    scoreboard_id SERIAL PRIMARY KEY,
    teacher_id int,
    num_problems_done int,
    score float,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);
-- display id, number problems, name, score


--Advanced Function: 
-- SELECT   reservation.startTime,
--          reservation.endTime,
--          reservation.MinTime - reservation.startTime AS totalTime,
--          (LOG(totalTime, 2 - (reservation.Difficulty - 1)/5)
--              + (totalTime)/5 - SQUARE(totalTime)/500) * 10 AS problemScore,

-- SELECT * FROM reservation
--

