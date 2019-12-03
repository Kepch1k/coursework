const yup = require('yup');
const schema = require('../models/userSchema');
const _ = require('lodash');
const promises = () => new Promise(resolve => resolve());
const asyncValidate = (values /*, dispatch */) => {
    return promises().then(async () => {
        const errors = {};
        try {
            const resEmail = await yup.reach(schema, 'email').isValid(values.email);
            const resFirstName = await yup.reach(schema, 'firstName').isValid(values.firstName);
            const resLastName = await yup.reach(schema, 'lastName').isValid(values.lastName);
            const resDisplayName = await yup.reach(schema, 'displayName').isValid(values.displayName);
            const resPassword = await yup.reach(schema, 'password').isValid(values.password);

            if (!values.firstName) {
                errors.firstName = 'Field cannot be empty';
            } else if (!resFirstName) {
                errors.firstName = 'Must be 8 characters or more';
            }

            if (!values.lastName) {
                errors.lastName = 'Field cannot be empty'
            } else if (!resLastName) {
                errors.lastName = 'Must be 8 characters or more';
            }

            if (!values.email) {
                errors.email = 'Required'
            } else if (!resEmail) {
                errors.email = 'Email is not valid format';
            }

            if (!values.displayName) {
                errors.displayName = 'Required'
            } else if (!resDisplayName) {
                errors.displayName = 'Must be 10 characters or more';
            }

            if (!values.password) {
                errors.password = 'Password required';
            } else if (!resPassword) {
                errors.password = 'Password is not valid. Use password with at least 8 chars,one lowercase and uppercase char and 1 number or special char ';
            }
            if (!values.passwordConfirmation) {
                errors.passwordConfirmation = 'Password Confirmation required';
            } else if (!(values.password === values.passwordConfirmation) && resPassword) {
                errors.passwordConfirmation = 'Password confirmation needs to match original password';
            }
        } catch (e) {

        }
        if (_.isEmpty(errors)) {
            return errors
        } else {
            return await Promise.reject(errors)
        }

    });
};

export default asyncValidate;