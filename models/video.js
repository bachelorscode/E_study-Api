const { model, Schema } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,

    },
    url: {
        type: String,

    },
}, {
    timestamps: true
});

const Video = model('Video', schema);
module.exports = Video;



