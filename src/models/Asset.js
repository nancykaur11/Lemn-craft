const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentHolder: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    tradingJourney: [
        {
            holder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            date: { type: Date, default: Date.now },
            price: { type: Number },
        },
    ],
    averageTradingPrice: { type: Number, default: 0 },
    lastTradingPrice: { type: Number, default: 0 },
    numberOfTransfers: { type: Number, default: 0 },
    proposals: { type: Number, default: 0 },
    isListed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Asset', AssetSchema);

