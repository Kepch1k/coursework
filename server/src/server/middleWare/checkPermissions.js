const Rights = require('../utils/Permisions');
module.exports.verifyPermissions = (object, place, action, maker) => {
    const ariaOfRights = Rights[place];
    const allowed = ariaOfRights[action];

    if (allowed.owner && maker.id === object.ownerId) {
        return true;
    } else {
        const allowedRoles = allowed.other;
        return !!allowedRoles.includes(maker.role);
    }
};

