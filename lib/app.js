import express from 'express';
import cookieParser from 'cookie-parser';

import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

import userController from './controllers/users.js';
import characterController from './controllers/characters.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(userController);
app.use(characterController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
