import jwt from 'jsonwebtoken';


export default {

    // middleware to verification token for users
    verifyUser(req, res, next) {
        const { headers } = req;
        const token = headers.authorization || headers['x-access-token'] || req.body.token;
        if (token) {
            jwt.verify(token, process.env.USER_KEY, (err) => {
                if (err) return res.status(403).json({ message: 'Invalid Token' });
                return next();
            });
        } else {
            res.status(401).json({ message: 'Token not provided' });
        }
    },

    // middleware to verification token for Admin
    verifyAdmin(req, res, next) {
        const { headers } = req;
        const token = headers.authorization || headers['x-access-token'] || req.body.token;
        if (token) {
            jwt.verify(token, process.env.ADMIN_KEY, (err) => {
                if (err) return res.status(403).json({ message: 'Invalid Token' });
                return next();
            });
        } else {
            res.status(401).json({ message: 'Token not provided' });
        }
    },

};
