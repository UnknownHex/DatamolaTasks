// eslint-disable-next-line no-unused-vars
const errorslist = {
    errorTypes: {
        validationError: 'Validation Error',
        accessDeny: 'Access Deny',
        notFound: 'Not found Error',
    },
    errorMessages: {
        wrongUser: 'You don\'t have permissions to remove or edit this task!',
        wrongLogin: 'You should use only Latin alphabet and _',
        existingLogin: (login) => `Login "${login}" is alredy exist!`,
        idNotFound: (id) => `ID "${id}" does not exist in our data!`,
        wrongFieldMsg: (key) => `${key.toUpperCase()} field is not valid!`,
        ignoredFiledMsg: (key) => `${key.toUpperCase()} is unknown field and will be ignored!`,
    },
};
