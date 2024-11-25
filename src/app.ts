import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';

import { DEFAULT_BASE_PATH, DEFAULT_MONGO_DB_NAME, DEFAULT_MONGO_DB_PATH, DEFAULT_PORT} from './utils/constants';
import { HTTP_CODES } from './utils/types';
import { ERROR_MESSAGES } from './utils/constants';

import userRouter from './routes/users';
import cardRouter from './routes/cards';
import index from './routes/index';

// import NotFoundError from './errors/not-found-error';


const { GENERAL } = ERROR_MESSAGES;

const {
  NOT_FOUND_404,
} = HTTP_CODES;

const {
  PORT = DEFAULT_PORT,
  BASE_PATH = DEFAULT_BASE_PATH,
  DATABASE = `${DEFAULT_MONGO_DB_PATH}/${DEFAULT_MONGO_DB_NAME}`,
} = process.env;

const cors = require("cors");

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DATABASE);

app.use(helmet());

app.use('/', index);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.all('*', (_, __, next) => next(GENERAL.NOTFOUND[NOT_FOUND_404]));


app.listen(PORT, () => {
  console.table({
    PORT: `App listening on port ${PORT}`,
    ADDRESS: `App address ${BASE_PATH}:${PORT}`,
  });
});
