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

    upload(req, res) {
        const { id } = req.headers;
        const userById = user.db[id];
        const filePath = `../img/uploads/${req.file.filename}`;
        userById.profilePicSrc = filePath;
        res.send({ message: 'Image uploaded successfully!' });
    },

    profile(req, res) {
        const { id } = req.headers;
        const userById = user.db[id];
        res.send(userById);
    },

    update(req, res) {
        const {
            about, sex, organisation, country, address,
        } = req.body;
        const { id } = req.params;
        const userById = user.db[id];
        userById.about = about;
        userById.sex = sex;
        userById.organisation = organisation;
        userById.country = country;
        userById.address = address;
        res.send({ message: 'updated successfully!' });
    },
};
