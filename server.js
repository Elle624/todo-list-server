import express from 'express';
import cors from 'cors';
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
