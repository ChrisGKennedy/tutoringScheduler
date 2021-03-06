//step 1 REQUIREMENTS/IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARE-----------------------
app.use(cors());

//getting data from the client side
//from the request.body obj
app.use(express.json()); //req.body

//ROUTES FOR SIMPLE DB----------------------------------------------------------------

//SCOREBOARD

//Updating a score
app.post("/simplecreatescore", async (req, res) => {
  try {
    const { teacher_id } = req.body;
    const { num_problems_done } = req.body;
    const { score } = req.body;
    const createTodo = await pool.query(
      "INSERT INTO scoreboard (teacher_id, num_problems_done, score) VALUES ($1, $2, $3)",
      [teacher_id, num_problems_done, score]
    );
    console.log("help");
    res.json("reservation was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Updating a score
app.put("/simpleupdatescore", async (req, res) => {
  try {
    const { teacher_id } = req.body;
    const { num_problems_done } = req.body;
    const { score } = req.body;
    const updateTodo = await pool.query(
      "UPDATE scoreboard SET num_problems_done = $2, score = $3 WHERE teacher_id = $1",
      [teacher_id, num_problems_done, score]
    );

    res.json("reservation was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Getting all scores joined with teachers on teacher_id
app.get("/simplescores", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);

    const allScores = await pool.query(
      "SELECT * FROM scoreboard s INNER JOIN teacher t ON t.teacher_id = s.teacher_id"
    );

    res.json(allScores.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting all scores joined with teachers on teacher_id
app.get("/simplescoresandteachers", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allScores = await pool.query(
      "SELECT * FROM scoreboard s INNER JOIN teacher t on s.teacher_id = t.teacher_id ORDER BY s.score ASC"
    );

    res.json(allScores.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get score from a room ID

//RESERVATIONS

//WARNING: DELETES ALL IN RESERVATION

//Creating a reservation without a room_id
app.delete("/simpledeleteall", async (req, res) => {
  try {
    const newReservation = await pool.query(
      "DELETE FROM reservation WHERE reservation_status >= 2"
    );

    res.json("deleted all reservations");
  } catch (err) {
    console.error(err.message);
  }
});

//search for teacherID by room id
app.get("/teacheridsearchroom_id/:room_id", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const { room_id } = req.params;
    const someReservations = await pool.query(
      "SELECT teacher_id FROM teacher where room_id = $1",
      [room_id]
    );

    res.json(someReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting the room names with the room id
app.get("/roomnames/:room_id", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const { room_id } = req.params;
    const someReservations = await pool.query(
      "SELECT room_name FROM room WHERE room_id = (SELECT room_id FROM teaacher WHERE room_name = $1)",
      [room_id]
    );

    res.json(someReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Gets all reservations with a given room name and their score (for use in estimated wait)
app.get("/simplereservationsearchname/:room_name", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const { room_name } = req.params;
    const someReservations = await pool.query(
      "SELECT * FROM reservation r INNER JOIN teacher t ON t.room_id = r.room_id INNER JOIN scoreboard s ON s.teacher_id = t.teacher_id WHERE r.room_id = (SELECT room_id FROM room WHERE room_name = $1) AND r.reservation_status < 2",
      [room_name]
    );

    res.json(someReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Creating a reservation with a room_id by giving a room name
app.post("/simplereservationadvanced", async (req, res) => {
  try {
    const { room_name } = req.body;
    const { problem } = req.body;
    const { studentName } = req.body;
    const newReservation = await pool.query(
      "INSERT INTO reservation (room_id, problem, studentName) VALUES((SELECT room_id FROM room WHERE room_name = $1), $2, $3) RETURNING *",
      [room_name, problem, studentName]
    );

    res.json(newReservation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/simplereservationadvanced", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allReservations = await pool.query("SELECT * FROM reservation");

    res.json(allReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Searches reservation by id
app.get("/simplereservationsearch/:id", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const { id } = req.params;
    const someReservations = await pool.query(
      "SELECT * FROM reservation WHERE room_id = $1",
      [id]
    );

    res.json(someReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Searches reservation by name
app.get("/simplereservationsearchbyname/:room_name", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const { room_name } = req.params;
    const someReservations = await pool.query(
      "SELECT * FROM reservation WHERE room_id = (SELECT room_id FROM room WHERE room_name = $1)",
      [room_name]
    );

    res.json(someReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/simplereservationsearch/:id", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const { id } = req.params;
    const someReservations = await pool.query(
      "SELECT * FROM reservation WHERE room_id = $1",
      [id]
    );

    res.json(someReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Creating a reservation without a room_id
app.post("/simplereservation", async (req, res) => {
  try {
    const { problem } = req.body;
    const { studentName } = req.body;
    const newReservation = await pool.query(
      "INSERT INTO reservation (problem, studentName) VALUES($1, $2) RETURNING *",
      [problem, studentName]
    );

    res.json(newReservation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting all reservations
app.get("/simplereservation", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allReservations = await pool.query(
      "SELECT * FROM reservation res INNER JOIN room r ON res.room_id = r.room_id"
    );

    res.json(allReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting all reservations with an reservation status of 2
app.get("/simplereservationscoreboard", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allReservations = await pool.query(
      "SELECT * FROM reservation WHERE reservation_status = 2"
    );

    res.json(allReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting a specific reservation
app.get("/simplereservation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT * FROM reservation WHERE reservation_id = $1",
      [id]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Updating a reservation (MAYBE NEED TO WRITE AN UPDATE FUNTION FOR FINISHING MEETING)
app.put("/simplereservation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { problem } = req.body;
    const { studentname } = req.body;
    const { reservation_status } = req.body;
    const updateTodo = await pool.query(
      "UPDATE reservation SET studentName = $2, problem = $1, reservation_status = $4 WHERE reservation_id = $3",
      [problem, studentname, id, reservation_status]
    );

    res.json("reservation was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

const updateteacher =
  "UPDATE teacher SET fullname = $3, email = $4, room_id = $1 WHERE teacher_id = $2";
//Updating a teacher
app.put("/simpleteacherupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { room_id } = req.body;
    const { email } = req.body;
    const { fullname } = req.body;

    const updateTeacher = await pool.query(
      "UPDATE teacher SET fullname = $3, email = $4, room_id = $1 WHERE teacher_id = $2",
      [room_id, id, fullname, email]
    );

    res.json("teacher was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Deleting a specific reservation
//maybe write a delete all (clear list)?
app.delete("/simplereservation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM reservation WHERE reservation_id = $1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//Delete all reservations
app.delete("/simplereservation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAllTodos = await pool.query("DELETE FROM reservation");
    res.json("All Todos deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//ROOMS

//Posting/creating a room
app.post("/simpleroom", async (req, res) => {
  try {
    const { room_name } = req.body;
    const { room_number } = req.body;
    const newRoom = await pool.query(
      "INSERT INTO room (room_name, room_number) VALUES($1, $2) RETURNING *",
      [room_name, room_number]
    );

    res.json(newRoom.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting all rooms
app.get("/simpleroom", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allRooms = await pool.query("SELECT * FROM room");

    res.json(allRooms.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting a specific room
app.get("/simpleroom/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await pool.query("SELECT * FROM room WHERE room_id = $1", [
      id,
    ]);

    res.json(room.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Updating a specific room (DOESNT WORK YET)
//i"nvalid input syntax for type boolean: "Acm" ""
app.put("/simpleroom/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { room_name } = req.body;
    const { room_number } = req.body;
    const updateRoom = await pool.query(
      "UPDATE room SET room_name = $1 AND room_number = $2 WHERE room_id = $3",
      [room_name, room_number, id]
    );

    res.json("room was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Getting a specific teacher
app.get("/simpleteacher/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await pool.query(
      "SELECT * FROM teacher WHERE teacher_id = $1",
      [id]
    );

    res.json(teacher.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Deleting a room
app.delete("/simpleroom/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRoom = await pool.query("DELETE FROM room WHERE room_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//TEACHER ROUTES

//creates a teacher with a room_id by providing a room name
app.post("/simpleteacherdadvanced", async (req, res) => {
  try {
    const { room_name } = req.body;
    const { fullname } = req.body;
    const { email } = req.body;
    const newRoom = await pool.query(
      "INSERT INTO reservation (room_name, fullname, email) VALUES((SELECT room_id FROM room WHERE room_name = $1), $2, $3) RETURNING *",
      [room_name, fullname, email]
    );

    res.json(newRoom.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Creating a teacher
//needs room_id? idk how to do
const text =
  "INSERT INTO teacher (fullname, email, room_id) VALUES($1, $2, (SELECT room_name FROM room WHERE room_id = $3)) RETURNING *";
const working =
  "INSERT INTO teacher (fullname, email, room_id) VALUES($1, $2, $3) RETURNING *";
app.post("/simpleteacher", async (req, res) => {
  try {
    const { fullname } = req.body;
    const { email } = req.body;
    const { room_name } = req.body;
    const newRoom = await pool.query(
      "INSERT INTO teacher (fullname, email, room_id) VALUES($1, $2, (SELECT room_id FROM room WHERE room_name = $3)) RETURNING *",
      [fullname, email, room_name]
    );

    res.json(newRoom.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting all teachers
app.get("/simpleteacher", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allTeachers = await pool.query("SELECT * FROM teacher");

    res.json(allTeachers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Deleting a teacher
app.delete("/simpleteacher/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRoom = await pool.query(
      "DELETE FROM teacher WHERE teacher_id = $1 ",
      [id]
    );
    res.json("teacher was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//COMPLEX FUNCTION ROUTES
//Inserting into scoreboard
// INSERT INTO scoreboard (teacher_id, num_problems_done, score) VALUES((SELECT teacher_id FROM teacher WHERE fullname = 'zhang'), 2, 3);
const scoreboardQuery =
  "SELECT scoreboard.teacher_id, scoreboard.num_problems, scoreboard.score, teacher.fullname FROM scoreboard INNER JOIN teacher ON scoreboard.teacher_id=teacher.teacher_id;";

//Getting all teachers for scoreboard
app.get("/simpleteacher", async (req, res) => {
  //await = wait for a function to execute
  try {
    const allTeachersWithScore = await pool.query("SELECT scoreboard.teacher");

    res.json(allTeachersWithScore.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/*
//ROUTES FOR ORGINAL DB-----------------------------------------------

//creating a reservation
app.post("/reservation", async (req, res) => {
  try {
    const { problem } = req.body;
    const newReservation = await pool.query(
      "INSERT INTO reservation (problem) VALUES($1) RETURNING *",
      [problem]
    );

    res.json(newReservation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all reservations
app.get("/reservation", async (req, res) => {
  //await = wait for a function to execute
  try {
    //console.log(req.body);
    const allReservations = await pool.query("SELECT * FROM reservation");

    res.json(allReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});
*/
//SERVER----------------------------------------------------------------
app.listen(5000, () => {
  console.log("server started and is on port 5000");
});

//EXAMPLES OF ROUTES --------------------------------
/*
app.post("/todos", async (req, res) => {
    //await = wait for a function to execute
    try {
      //console.log(req.body);
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      ); //$1 place holder for description var above
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get all todos
  app.get("/todos", async (req, res) => {
    //await = wait for a function to execute
    try {
      //console.log(req.body);
      const allTodos = await pool.query("SELECT * FROM todo");
  
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get a todo
  
  app.get("/todos/:id", async (req, res) => {
    //await = wait for a function to execute
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id,
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a todo
  
  app.put("/todos/:id", async (req, res) => {
    //await = wait for a function to execute
    try {
      const { id } = req.params;
      const { description } = req.body;
  
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("the Todo was sucessfully updated");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/todos/:id", async (req, res) => {
    //await = wait for a function to execute
    try {
      const { id } = req.params;
  
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id,
      ]);
  
      res.json("the Todo was sucessfully deleted");
    } catch (err) {
      console.error(err.message);
    }
  });
*/
//NOTES-------------------------
// /todos/:id (todos = room)
