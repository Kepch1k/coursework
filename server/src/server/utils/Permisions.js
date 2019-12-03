const {ROLE_BUYER, ROLE_CREATIVE} = require('./Consts');

const RIGHTS_OF_USERS = {
    contests: {
        create: {
            owner: null,
            other: [ROLE_BUYER],
        },
        change: {
            owner: true,
            other: [],
        },
        watch: {
            owner: true,
            other: [ROLE_CREATIVE],
        }
    },
    entries: {
        create: {
            owner: null,
            other: [ROLE_CREATIVE],
        },
        change: {
            owner: true,
            other: [],
        },
        watch: {
            owner: true,
            other: [ROLE_BUYER],
        }
    }
};

module.exports = RIGHTS_OF_USERS;