function catched(err, req, res, next) {
    switch (err.status) {
        case 400:
            if (!err.message) {
                res.status(err.status).send('Invalid request');
            } else {
                res.status(err.status).send(err.message);
            }
            break;
        case 401:
            if (!err.message) {
                res.status(err.status).send('Unauthorized');
            } else {
                res.status(err.status).send(err.message);
            }
            break;

        case 403:
            if (!err.message) {
                res.status(err.status).send('No access');
            } else {
                res.status(err.status).send(err.message);
            }
            break;


        case 404:
            if (!err.message) {
                res.status(err.status).send('Data not found');
            } else {
                res.status(err.status).send(err.message);
            }
            break;

        case 419:
            if (!err.message) {
                res.status(err.status).send('Session is ended.');
            } else {
                res.status(err.status).send(err.message);
            }
            break;

        case 452:
            if (!err.message) {
                res.status(err.status).send('Sent inappropriate data');
            } else {
                res.status(err.status).send(err.message);
            }
            break;

        default:
            res.status(500).send('Server error');
    }
}

module.exports = catched;
