const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    album: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Album',
        // required: true,
    }
});

const musicModel = mongoose.model('Music', musicSchema);

module.exports = musicModel;