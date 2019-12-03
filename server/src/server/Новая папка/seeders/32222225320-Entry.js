module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Entries', [
            {
                contestId: 1,
                prospectiveText: "axaxaxaxaxa",
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 2,
                nickName: "UserSignUp"
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
    },
};