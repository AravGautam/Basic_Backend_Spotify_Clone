const express = require('express');
const musicController = require('../controllers/music.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
});
const router = express.Router();


router.post('/upload', authMiddleware.authorizeArtist, upload.single('music'), musicController.createMusic);

router.post('/album', authMiddleware.authorizeArtist, musicController.createAlbum);

router.get('/albums', authMiddleware.authenticateToken, musicController.getAllAlbums);

router.get('/albums/:id', authMiddleware.authenticateToken, musicController.getAlbumById);

router.get('/',authMiddleware.authorizeUser, musicController.getAllMusics);

router.get('/:id', authMiddleware.authorizeUser, musicController.getMusicById);

module.exports = router;