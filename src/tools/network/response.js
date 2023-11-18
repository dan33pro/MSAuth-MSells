exports.success = (req, res, message, status) => {
    let statusCode = status || 200;
    let ststausMessage = message || '';


    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: ststausMessage,
    });
};

exports.error = (req, res, message, status) => {
    let statusCode = status || 500;
    let ststausMessage = message || 'Internal server error';

    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: ststausMessage,
    });
};