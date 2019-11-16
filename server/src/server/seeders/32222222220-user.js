const bcrypt = require('bcrypt');

const random = Math.round(Math.random() * 1000);

const email = 'justin' + random + '@gmail.com';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: email,
            password: bcrypt.hashSync('333666999', bcrypt.genSaltSync(8)),
            firstName: 'Genre',
            lastName: 'Thompson',
            displayName: 'Tra-ta-ta',
            role: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
    },
};
