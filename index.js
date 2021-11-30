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

//ROUTES -----------------------------------------------

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

//SERVER------------------------------
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
