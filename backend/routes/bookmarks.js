const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// Get all bookmarks for the authenticated user
router.get('/', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user.userId }); // Use req.user.userId to get the user's ID
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new bookmark
router.post('/', async (req, res) => {
    const { movieId, title, backdropPath, releaseYear } = req.body;

    const bookmark = new Bookmark({
        userId: req.user.userId, // Attach the user's ID to the bookmark
        movieId,
        title,
        backdropPath,
        releaseYear,
    });

    try {
        const newBookmark = await bookmark.save();
        res.status(201).json(newBookmark);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a bookmark
router.delete('/:id', async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        // Check if the bookmark belongs to the authenticated user
        if (bookmark.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this bookmark' });
        }
        await bookmark.deleteOne();
        res.json({ message: 'Bookmark deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/movie/:movieId', async (req, res) => {
    try {
        const bookmark = await Bookmark.findOneAndDelete({ userId: req.user.userId, movieId: req.params.movieId });
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        res.json({ message: 'Bookmark deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
