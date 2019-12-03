const bcrypt = require('bcrypt');

const random = Math.round(Math.random() * 1000);

const email = 'justins' + random + '@gmail.com';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Notes', [{
            userId: 1,
            tags: ["5balls","smth"],
            titleOfNote: 'GG',
            contain: 'this is a contain for note',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
    },
};
