import db from './db';

const chatSchema = new db.Schema({
    // user: {
    //     type: db.ObjectId,
    //     ref: 'User',
    // },
    sent: { type: String, data: Date.now },
    reply: { type: String, date: Date.now },
});

export default db.model('Chat', chatSchema);
