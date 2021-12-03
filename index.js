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

//RESERVATIONS

//Creating a reservation
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
    const allReservations = await pool.query("SELECT * FROM reservation");

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
    const updateTodo = await pool.query(
      "UPDATE reservation SET studentName = $2, problem = $1 WHERE reservation_id = $3",
      [problem, studentname, id]
    );

    res.json("reservation was updated!");
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

//Creating a teacher
//needs room_id? idk how to do
app.post("/simpleteacher", async (req, res) => {
  try {
    const { fullname } = req.body;
    const { email } = req.body;
    const newRoom = await pool.query(
      "INSERT INTO teacher (fullname, email) VALUES($1, $2) RETURNING *",
      [fullname, email]
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
      "DELETE FROM teacher WHERE teacher_id = $1",
      [id]
    );
    res.json("teacher was deleted!");
  } catch (err) {
    console.log(err.message);
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
