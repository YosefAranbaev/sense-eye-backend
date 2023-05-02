const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorize(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(401);
        next();
    }
}

module.exports = { authenticateToken, authorize };