const yup = require('yup');
const schema = require('../../models/userSchema');
const _ = require('lodash');
const promises = () => new Promise(resolve => resolve());
const asyncValidate = (values /*, dispatch */) => {
    return promises().then(async () => {
        const errors = {};
        try {
            if (values.tab==="login"){
                const resEmail = await yup.reach(schema, 'email').isValid(values["login/email"]);
                const resPassword = await yup.reach(schema, 'password').isValid(values["login/password"]);

                if (!values["login/email"]) {
                    errors["login/email"] = 'Required'
                } else if (!resEmail) {
                    errors["login/email"] = 'Email is not valid format';
                }

                if (!values["login/password"]) {
                    errors["login/password"] = 'Password required';
                } else if (!resPassword) {
                    errors["login/password"] = 'Password is not valid. Use password with at least 8 chars,one lowercase and uppercase char and 1 number or special char ';
                }

            }else if(values.tab==="register"){
                const resEmail = await yup.reach(schema, 'email').isValid(values["register/email"]);
                const resUserName = await yup.reach(schema, 'userName').isValid(values["register/username"]);
                const resDisplayName = await yup.reach(schema, 'displayName').isValid(values["register/displayName"]);
                const resPassword = await yup.reach(schema, 'password').isValid(values["register/password"]);

                if (!values["register/username"]) {
                    errors["register/username"] = 'Field cannot be empty';
                } else if (!resUserName) {
                    errors["register/username"] = 'Must be 10 characters or more';
                }

                if (!values["register/email"]) {
                    errors["register/email"] = 'Required'
                } else if (!resEmail) {
                    errors["register/email"] = 'Email is not valid format';
                }

                if (!values["register/displayName"]) {
                    errors["register/displayName"] = 'Required'
                } else if (!resDisplayName) {
                    errors["register/displayName"] = 'Must be 8 characters or more';
                }

                if (!values["register/password"]) {
                    errors["register/password"] = 'Password required';
                } else if (!resPassword) {
                    errors["register/password"] = 'Password is not valid. Use password with at least 8 chars,one lowercase and uppercase char and 1 number or special char ';
                }

                if (!values["register/repeat_password"]) {
                    errors["register/repeat_password"] = 'Password Confirmation required';
                } else if (!(values["register/password"] === values["register/repeat_password"]) && resPassword) {
                    errors["register/repeat_password"] = 'Password confirmation needs to match original password';
                }

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