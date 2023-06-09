import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import scoresRouter from './router/scores.js';
import { sequelize } from './db/database.js';

const corsOption = {
  origin: process.env.CORS_ALLOW_ORIGIN,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));

app.use('/scores', scoresRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then((client) => {
  console.log(`Server is started...${new Date()}`);
  app.listen(process.env.PORT);
});
