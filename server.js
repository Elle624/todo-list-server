import express from 'express';
import cors from 'cors';
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());

app.locals.title = 'Todo List';

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get('port')}.`
  );
});
