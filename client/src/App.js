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

//    function deleteTask(id) {
//     return axios.delete(baseURL + "/" + id);
// }


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
            element={<TodoList todos={todos} addTodo={addTodo} setTodos={setTodos} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
