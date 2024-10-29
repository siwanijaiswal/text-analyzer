const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    userId: String,
    text: String,
});

module.exports = mongoose.model('Text', textSchema);
