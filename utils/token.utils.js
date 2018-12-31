let jwt = require('jsonwebtoken');

let createToken = function(auth) {
    return jwt.sign({
            id: auth.id,
            first_name: auth. first_name,
            last_name: auth.last_name,
            email: auth.email,
            created: auth.created
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
    generateToken: function(req, res, next) {
        req.token = createToken(req.auth);
        return next();
    },
    sendToken: function(req, res) {
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    }
};