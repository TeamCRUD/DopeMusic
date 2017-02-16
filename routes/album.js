var express = require('express');
var router = express.Router();

var album_find = require("../middlewares/find_album")
var song_find = require("../middlewares/find_song")

var AlbumCtrl = require("../middlewares/album_reset")
var SongCtrl = require("../middlewares/song_reset")

//album
router.get("/new", AlbumCtrl.renderNewAlbum)

router.all("/:id*",album_find, song_find)

router.get("/:id/edit", AlbumCtrl.renderEditAlbum)

router.route("/:id")
    .get(AlbumCtrl.renderShowAlbum)
    .put(AlbumCtrl.updateAlbum)
    .delete(AlbumCtrl.deleteAlbum)

router.route("/")
    .get(AlbumCtrl.allAlbum)
    .post(AlbumCtrl.addAlbum)

// song
router.get("/:id/song/new", SongCtrl.renderNewSong)

router.route("/song/:id")
    .get(SongCtrl.renderShowSong)

router.route("/:id/song")
    .post(SongCtrl.addSong)

module.exports = router;