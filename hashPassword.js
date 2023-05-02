const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashPassword = (req, res, next) => {
    const { password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).json({ error: 'Error hashing password' });
            return;
        }

        req.body.password = hash;
        next();
    });
};
