class Reset {
    get rules() {
        return {
            token: 'required',
            password: 'required|confirmed',
        };
    }

    get messages() {
        return {
            'token.required': 'You must provide a token.',
            'password.required': 'You must provide a password',
            'password.confirmed': 'You must provide a password confirmed',
        };
    }
}

module.exports = Reset;
