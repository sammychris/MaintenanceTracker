import db from './db';


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const requestSchema = {
    date: { type: Date, default: Date.now },
    type: { type: String, required: true },
    status: { type: String, default: 'pending' },
    description: { type: String, required: true },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reqId: { type: Number, default: getRndInteger(1000000, 9999999) },
};

export default db.model('Request', requestSchema);
