// error-handling Middleware
exports.customErrorHandler = (err, req, res, next) => {
    if ("status" in err) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};

// Database Pg Errors
exports.handlePSQL400Errors = (err, req, res, next) => {
    const psqlErrorCodes = ["22P02", "23502", "42703"];
    if (psqlErrorCodes.includes(err.code)) {
        res.status(400).send({ msg: "Bad Request!" });
    } else next(err);
};

exports.handlePSQL404Error = () => {
    const psqlErrorCodes = ["23503"];
    if (psqlErrorCodes.includes(err.code)) {
        res.status(404).res.send({ msg: "Request not found!" });
    }
};

// Invalid urls
exports.handle404Errors = (err, req, res, next) => {
    res.status(404).send({ msg: "Path not found!" });
};

// Controller
exports.handle405Errors = (err, req, res, next) => {
    res.status(405).send({ msg: "Sorry invalid method!" });
};

// Server-side Error
exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "server error!" });
};