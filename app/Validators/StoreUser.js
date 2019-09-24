class StoreUser {
    get rules() {
        return {
            name: 'required',
            email: 'email|required|unique:users',
            password: 'required|confirmed',
        };
    }

    get messages() {
        return {
            'name.required': 'You must provide a name.',
            'email.required': 'You must provide a email address.',
            'email.email': 'You must provide a valid email address.',
            'email.unique': 'This email is already registered.',
            'password.required': 'You must provide a password',
            'password.confirmed': 'You must provide a password confirmed',
        };
    }
}

module.exports = StoreUser;
