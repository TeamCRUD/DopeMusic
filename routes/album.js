var express = require('express');
var router = express.Router();

var album_find = require("../middlewares/find_album")
var song_find = require("../middlewares/find_song")

var AlbumCtrl = require("../controllers/album")
var SongCtrl = require("../controllers/song")

// like 

//album
router.get("/new", AlbumCtrl.renderNewAlbum)

router.all("/:id*",album_find, song_find.findAll)

router.get("/:id/edit", AlbumCtrl.renderEditAlbum)

router.route("/:id")
    .get(AlbumCtrl.renderShowAlbum)
    .put(AlbumCtrl.updateAlbum)
    .delete(AlbumCtrl.deleteAlbum)

router.route("/")
    .get(AlbumCtrl.allAlbum)
    .post(AlbumCtrl.uploadCover, AlbumCtrl.addAlbum)

// song
router.get("/:id/song/new", SongCtrl.renderNewSong)
router.all("/:id/song/:song*", song_find.findOne)
router.get("/:id/song/:song/edit", SongCtrl.renderEditSong)

router.route("/:id/song/:song/")
    .put(SongCtrl.updateSong)
    .delete(SongCtrl.deleteSong)

router.route("/:id/song")
    .post(SongCtrl.uploadSong, SongCtrl.addSong)
    
module.exports = router;