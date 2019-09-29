class StoreCap {
    get rules() {
        return {
            name: 'required',
            date: 'date|required',
            amount: 'number|required',
        };
    }

    get messages() {
        return {
            'name.required': 'You must provide a name',
            'date.required': 'You must provide a date',
            'amount.required': 'You must provide a amount',
        };
    }
}

module.exports = StoreCap;
