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

//ROUTES----------

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
