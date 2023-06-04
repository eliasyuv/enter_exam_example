// App.js
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

const App = () => {
  axios.defaults.withCredentials = true;
  const baseURL = "http://localhost:3080";

  const [userId, setUserId] = useState([]);
  const [todos, setTodos] = useState([]);




  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(`${baseURL}/todos`)
      .then((response) => setTodos(response.data.Todos))
      .catch((error) => console.error(error));
  };




const updateTask = (id, task) => {
  axios.put(`${baseURL}/todos/${id}`, task)
    .then(response => {
      console.log('Task updated', response.data);
    })
    .catch(error => {
      console.error('Error updating task', error);
    });
};


  const deleteTodo = (id) => {
    console.log(`${baseURL}/todos/${id}`);
    axios.delete(`${baseURL}/todos/${id}`,
    {  withCredentials: true})
      .then((response) => {
      console.log(response);

       setTodos(todos.filter((todo) => todo.id !==id));
        console.log('Todo deleted');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const deleteTodo = (id) => {
  //   axios
  //     .delete(`${baseURL}/todos/${id}`)
  //     .then(() => {
  //       setTodos(todos.filter((todo) => todo.id !== id));
  //       console.log('Todo deleted');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const addTodo = (title) => {
    axios
      .post(
        `${baseURL}/todos`,
        {
          todo: { title, done: false },
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data.todo]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    axios
      .get(`${baseURL}/user`)
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<TodoList todos={todos} addTodo={addTodo} setTodos={setTodos} deleteTodo={deleteTodo} updateTask={updateTask}/>}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
