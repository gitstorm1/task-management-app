import { describe, it } from 'node:test';
import assert from 'node:assert';
import knex from 'knex';

import * as database from './database.js';

describe('Create user', () => {
    it('Should create a record in the users table', async () => {
        id = await database.createUser('testdatabase@db.com', 'password');


    });
});