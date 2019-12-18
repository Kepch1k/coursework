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
                    errors["login/email"] = 'Обязательно'
                } else if (!resEmail) {
                    errors["login/email"] = 'Некорректная почта';
                }

                if (!values["login/password"]) {
                    errors["login/password"] = 'Пароль обязателен';
                } else if (!resPassword) {
                    errors["login/password"] = 'Пароль не подходит, используйте как минимум 8 символов,по 1 в верхнем и нижнем регистрах и хоть 1 цифру или специальный символ';
                }

            }else if(values.tab==="register"){
                const resEmail = await yup.reach(schema, 'email').isValid(values["register/email"]);
                const resUserName = await yup.reach(schema, 'userName').isValid(values["register/username"]);
                const resDisplayName = await yup.reach(schema, 'displayName').isValid(values["register/displayName"]);
                const resPassword = await yup.reach(schema, 'password').isValid(values["register/password"]);

                if (!values["register/username"]) {
                    errors["register/username"] = 'Обязательно';
                } else if (!resUserName) {
                    errors["register/username"] = 'От 10 и более символов';
                }

                if (!values["register/email"]) {
                    errors["register/email"] = 'Обязательно'
                } else if (!resEmail) {
                    errors["register/email"] = 'Некорректная почта';
                }

                if (!values["register/displayName"]) {
                    errors["register/displayName"] = 'Обязательно'
                } else if (!resDisplayName) {
                    errors["register/displayName"] = 'От 8 и более символов';
                }

                if (!values["register/password"]) {
                    errors["register/password"] = 'Пароль обязателен';
                } else if (!resPassword) {
                    errors["register/password"] = 'Пароль не подходит, используйте как минимум 8 символов,по 1 в верхнем и нижнем регистрах и хоть 1 цифру или специальный символ';
                }

                if (!values["register/repeat_password"]) {
                    errors["register/repeat_password"] = 'Подтверждение пароля обязательно';
                } else if (!(values["register/password"] === values["register/repeat_password"]) && resPassword) {
                    errors["register/repeat_password"] = 'Пароли должны совпадать';
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