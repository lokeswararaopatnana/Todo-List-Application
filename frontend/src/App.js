import React, {useState,useEffect} from 'react';
import axios from 'axios';
import "./App.css"

function App(){
  const [todos,setTodos] = useState([]);
  const [newTodo,setNewTodo] = useState("");

  useEffect(()=>{
    fetchTodos();
  },[]);

  const fetchTodos = async ()=>{
    const response = await axios.get("http://localhost:5000")
    setTodos(response.data);
  };

  const addTodo = async ()=>{
    const response = await axios.post("http://localhost:5000/newTodo",{title:newTodo});
    if (newTodo === ""){
      alert("Todo Item Can't be Empty!");
      return;
    }
    setTodos([...todos,response.data]);
    setNewTodo("");
  };

  const toggleTodo = async (id,completed) =>{
    await axios.put(`http://localhost:5000/updateTodo/${id}`,{completed:!completed});
    setTodos(todos.map(todo => (todo.id === id ? {...todo,completed:!completed}:todo)));
  };

  const deleteTodo = async (id) =>{
    await axios.delete(`http://localhost:5000/deleteTodo/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='bg-container'>
    <div className='App'>
      <h1 className='heading'>Todo List</h1>
      <div className='input-container'>
      <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
      placeholder='Add New Todo' />
      <button className='add' onClick={addTodo}>Add</button>
      </div>
      <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{textDecoration:todo.completed ? 'line-through':'none'}}>
          {todo.title}
          <div>
          <button className='complete' onClick={()=> toggleTodo(todo.id,todo.completed)}>
            {todo.completed ? 'Undo':'Complete'}
          </button>
          <button className='delete' onClick={()=> deleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
      </ul>
    </div>
    </div>
  );
}

export default App;