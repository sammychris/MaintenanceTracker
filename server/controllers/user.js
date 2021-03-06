import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userSchema';

dotenv.config();

export default {

    signUp(req, res) {
        // const userSecret = process.env.USER_KEY;
        const { name, email, password } = req.body;
        User.findOne({ email }, (e, result) => {
            if (result) return res.json({ message: 'user already exist!', success: false });
            // jwt.sign(req.body, userSecret, { expiresIn: '90h' }, (err, token) => {
            // if (err) return res.send(err);
            return new User({ name, email, password }).save((er) => {
                if (er) return res.send(er);
                return res.status(201).json({ message: 'successfully registered!', success: true });
            });
            // });
        });
    },

    logIn(req, res) {
        const adminSecret = process.env.ADMIN_KEY;
        const userSecret = process.env.USER_KEY;
        const { email, password, admin } = req.body;
        const scrtKey = admin ? adminSecret : userSecret;

        User.findOne({ email }, (err, user) => {
            if (err) return res.send(err);
            if (!user) return res.json({ message: 'user does not exist!', success: false });
            if (user.password !== password) return res.json({ message: 'wrong password', success: false });
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
            };
            return jwt.sign(payload, scrtKey, { expiresIn: '2 days' }, (er, token) => {
                if (er) return console.log(er);
                return res.status(202).json({
                    message: 'loggedin successfully',
                    token,
                    user,
                    success: true,
                });
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
        User.findById(id, (err, user) => {
            if (err) return res.send(err);
            if (!user) return res.status(404).json({ message: 'page not found', success: false });
            return res.json({ user, success: true });
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
