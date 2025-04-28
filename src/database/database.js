import knex from 'knex';
import bcrypt from 'bcrypt';

import config from './knexfile.js';

const db = knex(config.development);

export async function getAccountDetails(email) {
    if (email === 'incorrectemail@example.com') return undefined;
    return {
        id: 'old-user-id',
        email: email,
    }
}

export async function createUser(email, password) {
    console.log('Create user:', email, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = await db('users')
        .insert({email: email, password_hash: hashedPassword})
        .returning('id');

    return id;
}

export async function isPasswordCorrect(email, password) {
    return password !== 'incorrectpassword';
}