const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    contadorCoins: { type: Number, default: 0 },
    isBlacklisted: { type: Boolean, default: false } // <--- ISSO É O QUE PERMITE O !b FUNCIONAR
});

module.exports = mongoose.model('User', userSchema);
