import express from 'express';
import isEmail from 'validator/lib/isEmail.js';

import * as database from './database.js';

const apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({ error: 'Email missing' });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ error: 'Password missing' });
        return;
    }

    if (!isEmail(req.body.email)) {
        res.status(400).send({ error: 'Invalid email' });
        return;
    }

    let accountDetails = await database.getAccountDetails(req.body.email);

    if (accountDetails === undefined) {
        res.status(401).send({ error: 'Incorrect email', });
        return;
    }

    if (!(await database.isPasswordCorrect(req.body.email, req.body.password))) {
        res.status(401).send({ error: 'Incorrect password', });
        return;
    }

    req.session.user = {
        id: accountDetails.id,
        email: accountDetails.email,
    }

    res.send({ message: 'Login successful' });
});

apiRouter.post('/signup', async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({ error: 'Email missing' });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ error: 'Password missing' });
        return;
    }

    if (!isEmail(req.body.email)) {
        res.status(400).send({ error: 'Invalid email' });
        return;
    }

    /*
    What consitutes as an invalid password is yet to be defined.

        if (req.body.password === 'invalidpassword') {
            res.status(401).send({ error: 'Invalid password', });
            return;
        }
    */
    //

    let userId = await database.createUser(req.body.email, req.body.password);

    req.session.user = {
        id: userId,
        email: req.body.email,
    }

    res.status(201).send({ message: 'Signup successful' });
});

export { apiRouter };