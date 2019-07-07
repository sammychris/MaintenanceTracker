import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userSchema';

dotenv.config();

export default {

    signUp(req, res) {
        // const userSecret = process.env.USER_KEY;
        const { name, email, password } = req.body;
        User.findOne({ email }, (e, result) => {
            if (result) return res.send('user already exist!');
            // jwt.sign(req.body, userSecret, { expiresIn: '90h' }, (err, token) => {
            // if (err) return res.send(err);
            return new User({ name, email, password }).save((er) => {
                if (er) return res.send(er);
                return res.status(201).json({ message: 'successfully registered!' });
            });
            // });
        });
    },

    signIn(req, res) {
        const adminSecret = process.env.ADMIN_KEY;
        const userSecret = process.env.USER_KEY;
        const { email, password, admin } = req.body;
        const scrtKey = admin ? adminSecret : userSecret;

        User.findOne({ email }, (err, user) => {
            if (err) return res.send(err);
            if (!user) return res.json({ message: 'user does not exist!' });
            if (user.password !== password) return res.json({ message: 'wrong password' });
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
            };
            return jwt.sign(payload, scrtKey, { expiresIn: 'Infinity' }, (er, token) => {
                if (er) return console.log(er);
                return res.status(202).json({ message: 'loggedin successfully', token, user });
            });
        });
    },

    // upload(req, res) {
    //     const { id } = req.headers;
    //     const userById = user.db.find(a => a.id === id);
    //     const filePath = `../img/uploads/${req.file.filename}`;
    //     userById.profilePicSrc = filePath;
    //     res.send({ message: 'Image uploaded successfully!' });
    // },

    oneUser(req, res) {
        const { id } = req.params;
        User.findById(id, (err, result) => {
            if (err) return res.send(err);
            if (!result) return res.status(404).send('page not found');
            return res.json(result);
        });
    },

    // update(req, res) {
    //     const {
    //         about, sex, organisation, country, address,
    //     } = req.body;
    //     const { id } = req.params;
    //     const userById = user.db.find(a => a.id === id);
    //     userById.about = about;
    //     userById.sex = sex;
    //     userById.organisation = organisation;
    //     userById.country = country;
    //     userById.address = address;
    //     res.send({ message: 'updated successfully!' });
    // },
    // usersChats(req, res) {
    //     const { id } = req.params;
    //     const userById = user.db.find(a => a.id === id);
    //     res.send({ users: userById.usersChat });
    // },
};
