let express = require('express');
let router = express.Router();
let {generateToken, sendToken} = require('../utils/token.utils');
let passport = require('passport');
require('../passport')();

router.route('/auth/google')
    .post(passport.authenticate('google-token', {session: false}), function (req, res, next) {
        console.log(req.user);
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id,
            first_name: req.user. first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            created: req.user.created
        };

        next();
    }, generateToken, sendToken);

module.exports = router;