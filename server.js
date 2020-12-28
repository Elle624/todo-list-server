import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { todoList as todoListDeets } from './todo-list.js';
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());

app.locals.title = 'Todo List';
app.locals.todoList = { todoList: todoListDeets };

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get('port')}.`
  );
});

app.get('/todo-list', (request, response) => {
  response.json(app.locals.todoList);
});

app.post('/todo-list', (request, response) => {
  const todoListDeets = app.locals.todoList.todoList;
  const newTodoItem = request.body;
  if (
    newTodoItem.id &&
    newTodoItem.text &&
    newTodoItem.complete !== undefined
  ) {
    todoListDeets.push(newTodoItem);
    response
      .status(201)
      .json(`You have added ${newTodoItem.id} to your todo list!`);
  } else {
    response
      .status(201)
      .json(
        'Could not add item to todo list because of incomplete information. Please try again.'
      );
  }
});

app.delete('/todo-list', (request, response) => {
  let todoListDeets = app.locals.todoList.todoList;
  const todoItem = request.body;
  const correctItem = todoListDeets.find((item) => item.id === todoItem.id);
  if (correctItem) {
    const updatedList = todoListDeets.filter(
      (item) => item.id !== correctItem.id
    );
    app.locals.todoList.todoList = updatedList;
    response
      .status(201)
      .json(`You have removed ${correctItem.id} from your todo list!`);
  } else {
    response
      .status(201)
      .json(
        'ID does not match our record, could not remove item from todo list. Please try again.'
      );
  }
});

app.patch('/todo-list/:id', (request, response) => {
  const { id } = request.params;
  const correctId = app.locals.todoList.todoList.find((todo) => todo.id === id);
  if (!correctId) {
    response.status(202).json('Please enter a correct id#');
  }
  const updatedList = app.locals.todoList.todoList.map((todo) =>
    todo.id === id ? { ...todo, complete: !todo.complete } : todo
  );
  app.locals.todoList.todoList = updatedList;
  response
    .status(201)
    .json(`You have updated ${correctId.id} from your todo list!`);
});
