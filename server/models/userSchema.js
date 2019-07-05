import db from './db';


const userSchema = new db.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    chat: { type: db.Schema.Types.ObjectId, ref: 'Chat' },
});

export default db.model('User', userSchema);
