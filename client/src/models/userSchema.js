const yup = require('yup');

const schema = yup.object().shape({
    email: yup.string()
        .email("Invalid email address")
        .required("Required"),
    password: yup.string()
        .required("Required")
        .min(8, 'at least 8 chars')
        .matches(/[a-z]/, 'at least one lowercase char')
        .matches(/[A-Z]/, 'at least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    firstName: yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
    lastName: yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
    displayName: yup.string()
        .min(10, "Must be longer than 10 characters")
        .required("Required"),

});

module.exports = schema;