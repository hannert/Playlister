/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.get('/playlistsFromUser', auth.verify, PlaylistController.getPlaylistsFromUser)
router.get('/getPlaylistsWithName', auth.verify, PlaylistController.getPlaylistsWithName)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.put('/addCommentToPlaylist', auth.verify, PlaylistController.addCommentToPlaylist)

module.exports = router