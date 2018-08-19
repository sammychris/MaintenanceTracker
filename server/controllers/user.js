import jwt from 'jsonwebtoken';
import user from '../models/userSchema';


export default {

    signUp(req, res) {
        const {
            firstname, lastname, email, password,
        } = req.body;
        const info = {
            firstname,
            lastname,
            email,
            password,
            request: [],
        };
        jwt.sign(info, process.env.USER_KEY, { expiresIn: '1h' }, (err, token) => {
            if (err) return console.log(err);
            user.db.push(info);
            return res.status(201).json({ message: 'successfully registered!', token });
        });
    },

    logIn(req, res) {
        const adminOrUser = (req.body.admin) ? process.env.ADMIN_KEY : process.env.USER_KEY;
        const { email, password } = req.body;
        const findUser = user.db.find(v => v.email === email.toLowerCase());
        if (!findUser) return res.send('user does not exist!');
        if (findUser.password !== password) return res.send('wrong password');
        jwt.sign({ findUser }, adminOrUser, { expiresIn: '1h' }, (err, token) => {
            if (err) return console.log(err);
            return res.status(202).send({ message: 'loggedin successfully', token });
        });
        return console.log('error');
    },
};
