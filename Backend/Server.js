const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1202",
    database:"todoapp"
});

db.connect(error=>{
    if (error) throw error;
    console.log("Connected to MySQL Database");
});

// Post a new todo
app.post("/newTodo",(request,response)=>{
    const {title} = request.body;
    db.query("INSERT INTO todos (title) VALUES (?)",[title],(error,result)=>{
        if (error) throw error;
        response.json({id:result.insertId,title,completed:false});
        console.log("New Todo is added!")
    });
});

// Get all todos
app.get("/",(request,response)=>{
    db.query("SELECT * FROM todos",(error,result)=>{
        if (error) throw error;
        response.json(result);
        console.log(result);
    });
});

// Update a todo
app.put("/updateTodo/:id",(request,response)=>{
    const {id} = request.params;
    const {completed} = request.body;
    db.query("UPDATE todos SET completed = ? WHERE id = ?",[completed,id],(error,result)=>{
        if (error) throw error;
        response.json({message:"Todo Updated!"});
        console.log("Todo Updated!");
    });
});

// Delete a todo
app.delete("/deleteTodo/:id",(request,response)=>{
    const {id} = request.params;
    db.query("DELETE FROM todos WHERE id = ?",[id],(error,result)=>{
        if (error) throw error;
        response.json({message:"Todo Deleted!"});
        console.log("Todo Deleted!");
    })
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}/`)
})