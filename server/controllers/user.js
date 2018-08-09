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
        user.db.push(info);
        return res.json(info);
    },

    logIn(req, res) {
        const { email, password } = req.body;
        const findUser = user.db.find(v => v.email === email.toLowerCase());
        if (!findUser) return res.send('user does not exist!');
        if (findUser.password !== password) return res.send('wrong password');
        return res.send('user logged in successful!');
    },
};
