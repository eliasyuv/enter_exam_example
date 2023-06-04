// TodoList.js
import React, { useState } from "react";
import axios from "axios";
import "./TodoList.css";

import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import { render } from "react-dom";


const TodoList = ({todos, addTodo, setTodos ,deleteTodo,updateTask}) => {
  axios.defaults.withCredentials = true;
  // axios.get('http://localhost:3080/todos', { withCredentials: true });

  const [newTitle, setNewTitle] = useState([]);
  const [done, setDone] = useState('');
  const baseURL = "http://localhost:3080";


  const handleUpdate = async (event, currentTaskId) => {
    const originalTasks = todos;
    try {
      console.log(event+"1");
        const tasks = [...originalTasks];
        const index = tasks.findIndex((task) => task.id === currentTaskId);
        tasks[index] = { ...tasks[index] };
        console.log(event);
        if(event.target.value!=="done"){
        tasks[index].done=false;
        }
        else{
          tasks[index].done=true;
        }
        setTodos(tasks);
       updateTask(currentTaskId,{done:event.target.value});
    } catch (error) {
        console.log(error);
    }
};


const handleDelete = async (event, currentTaskId) => {
  const originalTasks = todos;
  try {
      const tasks = originalTasks.filter((task)=>task.id !==currentTaskId);
      setTodos(tasks);
      console.log(currentTaskId);
       deleteTodo(currentTaskId);

  } catch (error) {
      setTodos(originalTasks);
      console.log(error);
  }
};


const handleEdit = async (value, currentTaskId) => {
  const originalTasks = todos;
  try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task.id === currentTaskId);
      console.log(index);

      tasks[index] = { ...tasks[index] };
      console.log(value);
      tasks[index].title=value;
   
      setTodos(tasks);
  } catch (error) {
      console.log(error);
  }
};

  return (
    <Container maxWidth="sm">
      <br />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        data-testid="todoListing-title"
      >
        TODO list
      </Typography>
      {todos.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          data-testid="todoListing-notodosAvailable"
        >
          No todos available.
        </Typography>
      ) : (
        <List data-testid={"todoListing-list"}>
{/* If a.done is true and b.done is false, the expression evaluates to -1. This means that a should be sorted before b. Therefore, todo items with done: true will appear before those with done: false.          { todos.sort((a, b) => (a.done === b.done ? 0 : a.done ? -1 : 1)) */}
        { todos.sort((a, b) => (a.done === b.done ? 0 : a.done ? -1 : 1))
          .map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              className={todo.done ? "done" : "todo"}
            >
              <ListItemText
                primary={todo.title}
                secondary={todo.author}
                data-testid={`todoListing-todo-${todo.id}`}
              />
{/*when exclusive is set to true, it means that only one option can be selected at a time within the ToggleButtonGroup. When one option is selected, the previously selected option will be automatically deselected. */}
              <ToggleButtonGroup
                color="primary"
                value={todo.done ? "done" : "todo"}
                exclusive
                onClick={(event) =>{ handleUpdate(event,todo.id);}
                }
              >

                <ToggleButton value="done">Done</ToggleButton>
                <ToggleButton value="todo">Todo</ToggleButton>
              </ToggleButtonGroup>

            
              <TextField
                label="Edit task"
                onChange={(event) => {
                  handleEdit(event.target.value,todo.id);
                }}
              />

              <Button onClick={(event) =>{ handleDelete(event,todo.id);
                 fetch(baseURL, {
                  method: 'DELETE',
                })
              }}
              >delete
              </Button>


            </ListItem>
          ))}
        </List>
      )}
      <Grid item xs={12}>
        <Typography variant="h6" data-testid={`todoList-addTodo-title`}>
          Add todo
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
          data-testid={`todoList-addTodo-title`}
        />


        
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => addTodo(newTitle)}
          data-testid={`todoList-addTodo-submitBtn`}
        >
          Submit TODO
        </Button>
      </Grid>
    </Container>
  );
};

export default TodoList;
