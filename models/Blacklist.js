const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    idAlvo: { type: String, required: true },
    motivo: { type: String, required: true },
    provaUrl: { type: String, required: true },
    autorId: { type: String, required: true },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blacklist', blacklistSchema);

