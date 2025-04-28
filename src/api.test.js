import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './app.js';

describe('Authentication', () => {
    describe('Logging in', () => {
        it('Should reject login for missing body', async () => {
            const response = await request(app)
                .post('/api/login')
                .send();

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, '');
        });

        it('Should reject login for valid email and incorrect password', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'incorrectpassword',
                });

            assert.strictEqual(response.status, 401);
            assert.strictEqual(response.body.error, 'Incorrect password');
        });

        it('Should reject login for invalid email', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: '@example.com',
                    password: 'password',
                });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, 'Invalid email');
        });

        it('Should reject login for incorrect email', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'incorrectemail@example.com',
                    password: 'password',
                });

            assert.strictEqual(response.status, 401);
            assert.strictEqual(response.body.error, 'Incorrect email');
        });

        it('Should reject login for missing email', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: undefined,
                    password: 'password',
                });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, 'Email missing');
        });

        it('Should reject login for missing password', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: undefined,
                });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, 'Password missing');
        });

        it('Should login successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'password',
                });

            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.message, 'Login successful');
        });
    });

    describe('Signing up', () => {
        /*it('Should reject login for valid email and invalid password', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'invalidpassword',
                });

            assert.strictEqual(response.status, 401);
            assert.strictEqual(response.body.error, 'Invalid password');
        });*/

        it('Should reject signup for missing body', async () => {
            const response = await request(app)
                .post('/api/signup')
                .send();

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, '');
        });

        it('Should reject signup for invalid email', async () => {
            const response = await request(app)
                .post('/api/signup')
                .send({
                    email: '@example.com',
                    password: 'password',
                });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, 'Invalid email');
        });

        it('Should reject signup for missing email', async () => {
            const response = await request(app)
                .post('/api/signup')
                .send({
                    email: undefined,
                    password: 'password',
                });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, 'Email missing');
        });

        it('Should reject signup for missing password', async () => {
            const response = await request(app)
                .post('/api/signup')
                .send({
                    email: 'test@example.com',
                    password: undefined,
                });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(response.body.error, 'Password missing');
        });

        it('Should signup successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/signup')
                .send({
                    email: 'test@example.com',
                    password: 'password',
                });

            assert.strictEqual(response.status, 201);
            assert.strictEqual(response.body.message, 'Signup successful');
        });
    });

    describe('Logging out', () => {
        it('Should give an error if already logged out', async () => {
            const response = await request(app)
                .post('/api/logout')
                .send();
            
            assert.strictEqual(response.status, 401);
            assert.strictEqual(response.body.error, 'Not logged in');
        });

        it('Should logout successfully', async () => {
            const agent = request.agent(app);

            await agent
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'password',
                });
            
            const response = await agent
                .post('/api/logout')
                .send();
            
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.message, 'Logout successful');
        });
    });
});