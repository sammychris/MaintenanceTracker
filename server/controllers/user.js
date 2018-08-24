import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import user from '../models/userSchema';

dotenv.config();

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
        const userSecret = process.env.USER_KEY;
        jwt.sign(info, userSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) return console.log(err);
            user.db.push(info);
            return res.status(201).json({ message: 'successfully registered!', token });
        });
    },

    logIn(req, res) {
        let idByIndex;
        const adminSecret = process.env.ADMIN_KEY;
        const userSecret = process.env.USER_KEY;
        const { email, password, admin } = req.body;
        const findUser = user.db.find((e, i) => {
            idByIndex = i;
            return e.email === email.toLowerCase();
        });
        if (!findUser) return res.send({ error: 'user does not exist!' });
        if (findUser.password !== password) return res.send({ error: 'wrong password' });
        const secretKey = (admin && findUser.role) ? adminSecret : userSecret;
        jwt.sign(findUser, secretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) return console.log(err);
            return res.status(202).send(
                {
                    message: 'loggedin successfully', token, id: idByIndex, user: findUser,
                },
            );
        });
        return console.log(idByIndex);
    },
};
