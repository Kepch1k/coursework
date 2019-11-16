const {BankAccount} = require('../models/index');
module.exports.check = async (req, res, next) => {
    try {
        const card = req.body;
        const CreditCard = await BankAccount.find({where: {number: card.number, expiry: card.expiry, cvc: card.cvc}});
        if (!CreditCard) {
            next({status: 400, message: 'Card doesn\'t exists'});
        } else if (CreditCard.dataValues.balance < card.amountPayable) {
            next({status: 400, message: 'Insufficient funds'});
        } else {
            req.card = CreditCard.dataValues;
        }
        next();
    } catch (e) {
    }
};