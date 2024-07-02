const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    backdropPath: { type: String, required: true },
    releaseYear: { type: String, required: true },
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
