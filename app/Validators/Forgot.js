class Forgot {
    get rules() {
        return {
            email: 'email|required',
        };
    }

    get messages() {
        return {
            'email.required': 'You must provide a email address.',
        };
    }
}

module.exports = Forgot;
