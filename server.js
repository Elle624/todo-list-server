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
  const id = nanoid();
  const todoListDeets = app.locals.todoList.todoList;
  const newTodoItem = request.body;

  if (newTodoItem.text && newTodoItem.complete) {
    todoListDeets.push({ id, ...newTodoItem });
    response.status(201).send(`You have added ${id} to your todo list!`);
  } else {
    response
      .status(201)
      .send(
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
      .send(`You have removed ${correctItem.id} from your todo list!`);
  } else {
    response
      .status(201)
      .send(
        'ID does not match our record, could not remove item from todo list. Please try again.'
      );
  }
});
