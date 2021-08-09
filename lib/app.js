import express from 'express';
import cookieParser from 'cookie-parser';

import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// controllers here

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
