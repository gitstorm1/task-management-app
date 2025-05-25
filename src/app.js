import express from 'express';
import session from 'express-session';

import { apiRouter } from './api.js';

const app = express();

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(express.json());

app.use('/api', apiRouter);

export default app;