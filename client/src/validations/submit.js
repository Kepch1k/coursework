import {SubmissionError} from 'redux-form';

const yup = require('yup');
const schema = require('../models/userSchema');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let resEmail;

function submit(values) {
    return sleep(200).then(async () => {

        try {
            resEmail = await yup.reach(schema, 'email').isValid(values.email);
        } catch (e) {
        }
        if (!resEmail) {
            throw new SubmissionError({
                email: 'Email is not valid format',
                _error: 'Login failed!'
            })
        }
        const data = {
            email: values.email,
            password: values.password
        };

    })
}

export default submit
