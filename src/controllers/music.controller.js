const musicModel = require('../models/music.model.js');
const albumModel = require('../models/album.model.js');
const { uploadFile } = require('../services/storage.service.js');


async function createMusic(req, res) {
    try {
        const { uri, title, artist, album } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }
        const result = await uploadFile(file.buffer.toString("base64"), file.originalname);

        const newMusic = await musicModel.create({
            uri: result.url,
            title: title,
            artist: req.user.id,
        });
        res.status(201).json({
            message: 'Music created successfully',
            newMusic: {
                id: newMusic._id,
                uri: newMusic.uri,
                title: newMusic.title,
                artist: newMusic.artist,
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function createAlbum(req, res) {
    try {
        const { musicIds, title } = req.body;

        const album = await albumModel.create({
            title: title,
            artist: req.user.id,
            musics: musicIds
        });
        res.status(201).json({
            message: 'Album created successfully',
            newAlbum: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllMusics(req, res) {
    try {
        const musics = await musicModel
            .find()
            // .skip(4)
            .limit(4)
            .populate("artist", "username email album");
        res.status(200).json({
            message: 'Musics retrieved successfully',
            musics: musics,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMusicById(req, res) {
    try {
        const music = await musicModel.findById(req.params.id).populate("artist", "username email album");
        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }
        res.status(200).json({
            message: 'Music retrieved successfully',
            music: music
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel.find().select("title artist").populate("artist", "username email")
        res.status(200).json({
            message: 'Albums retrieved successfully',
            albums: albums
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAlbumById(req, res) {
    try {
        const album = await albumModel.findById(req.params.id).populate("artist", "username email").populate("musics", "title uri");
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json({
            message: 'Album retrieved successfully',
            album: album
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createMusic,
    createAlbum,
    getAllMusics,
    getMusicById,
    getAllAlbums,
    getAlbumById,
};