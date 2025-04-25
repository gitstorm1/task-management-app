export async function getAccountDetails(email) {
    if (email === 'incorrectemail@example.com') return undefined;
    return {
        id: 'old-user-id',
        email: email,
    }
}

export async function createUser(email, password) {
    console.log('Create user:', email, password);
    return 'new-user-userid';
}

export async function isPasswordCorrect(email, password) {
    return password !== 'incorrectpassword';
}