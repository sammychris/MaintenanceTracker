import db from './db';

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
};

export default db.model('Request', requestSchema);
