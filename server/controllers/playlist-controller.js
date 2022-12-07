const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }


    let playlist = new Playlist(body);
    let newName = playlist.name;
    console.log("new playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }
    

    User.findOne({ _id: req.userId }, async (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        let userLists = user.playlists;

        for (let i = 0; i < userLists.length; i++){
            await Playlist.findOne({_id:userLists[i], name: playlist.name}, (err, tempPlaylist) => {
                if(err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if(tempPlaylist) {
                    playlist.name = playlist.name + '(1)';
                }
            })
        }

        
        console.log(playlist.name)
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: error.message
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({});
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));

    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // IS THIS PLAYLIST PUBLIC?
        if (list.public === false) {
            // PLAYLIST NOT PUBLIC:
            // DOES THIS PLAYLIST BELONG TO THE USER?
            async function asyncFindUser(list) {
                await User.findOne({ email: list.ownerEmail }, (err, user) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err });
                    }
                    console.log("user._id: " + user._id);
                    console.log("req.userId: " + req.userId);
                    if (user._id == req.userId) {
                        console.log("correct user!");
                        return res.status(200).json({ success: true, playlist: list });
                    }
                    else {
                        console.log("incorrect user!");
                        return res.status(400).json({ success: false, description: "authentication error" });
                    }
                })
            }
            asyncFindUser(list).catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Error!',
                })
            });
        }
        else{
            return res.status(200).json({success: true, playlist: list});
        }
        
        
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    console.log("getPlaylistPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                console.log("found Playlists: " + JSON.stringify(playlists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    console.log("!playlists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    console.log("Send the Playlist pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name,
                            ownerUsername: list.ownerUsername,
                            published: list.published,
                            public: list.public,
                            likes: list.likes,
                            dislikes: list.dislikes,
                            listens: list.listens,
                            publishedTime: list.publishedTime,
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({ public: true }, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistsFromUser = async (req, res) => {
    let queryUsername = req.query
    // console.log("query name:")
    // console.log(req.query.userName)
    // console.log(req.params)
    // console.log(req.body)

    if(req.query.user){
        console.log("Username search")
        // Search within the Users button
        await Playlist.find({ ownerUsername: req.query.userName, public:true}, (err, playlists) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if(!playlists.length) {
                return res.status(200).json({success: true, data: playlists})
            }

            return res.status(200).json({ success: true, data: playlists })
        }).catch(err => console.log(err))
    }
    else if(req.query.all){
        // Search within the ALL tab
        console.log("All search")

        let nameQuery = new RegExp('^' + req.query.AllPlaylist)

        await Playlist.find({ name: nameQuery, public:true}, (err, playlists) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            return res.status(200).json({ success: true, data: playlists })
        }).catch(err => console.log(err))

    }
    else if(req.query.home){
        // Search within the HOME tab
        // First find user owned playlists
        // Then check if it belongs to user
        console.log("Home search")
        console.log(req.userId)
        let match = req.query.homePlaylist
        let nameQuery = new RegExp('^' + req.query.homePlaylist)
    
        await User.findOne({ _id: req.userId }, (err, user) => {
            console.log("find user with id " + req.userId);
            async function asyncFindList(email) {
                console.log("find all Playlists owned by " + email);
                await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                    // console.log("found Playlists: " + JSON.stringify(playlists));
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
                    if (!playlists) {
                        console.log("!playlists.length");
                        return res
                            .status(404)
                            .json({ success: false, error: 'Playlists not found' })
                    }
                    else {
                        console.log("Send the filtered pairs");
                        // PUT ALL THE LISTS INTO ID, NAME PAIRS
                        console.log('match:' + match)
                        let playlist = playlists.filter((list) => {return list.name.startsWith(match)});
                        return res.status(200).json({ success: true, data: playlist })
                    }
                }).catch(err => console.log(err))
            }
            asyncFindList(user.email);
        }).catch(err => console.log(err))

    }


}
getPlaylistsWithName = async (req, res) => {
    let queryPlaylistName = req.query.playlistName
    console.log("query name:")
    console.log(queryPlaylistName)
    coonso
    await Playlist.find({ name: "Untitled0", public:true}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))

}

updatePlaylist = async (req, res) => {
    console.log("UPDATE PLAYLIST -------------------")
    const body = req.body.playlist
    // console.log("updatePlaylist: " + JSON.stringify(body));
    // console.log("req.body.name: " + req.body.name);
    console.log("body public" + body.public)

    if(req.body.inc === true) console.log("INCREMENT LISTENS!")
    else if (req.body.inc === false) console.log("Update playlist data")

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    // If flag to increase listens count by 1, just update, no need to check
    if(req.body.inc === true){
        Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
            async function increment(playlist){
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Playlist not found!',
                    })
                }

                playlist.listens = playlist.listens + 1;
                console.log(playlist.listens)
                playlist
                    .save()
                    .then(() => {
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: playlist._id,
                            message: 'Playlist updated!',
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error.message));
                        return res.status(404).json({
                            error,
                            message: error,
                        })
                    })
            }
            increment(playlist)

        })

    }
    else if(req.body.inc === false){
        Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
            console.log("playlist found: " + JSON.stringify(playlist));
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Playlist not found!',
                })
            }

            // DOES THIS LIST BELONG TO THIS USER?
            async function asyncFindUser(list) {
                await User.findOne({ email: list.ownerEmail }, (err, user) => {
                    console.log("user._id: " + user._id);
                    console.log("req.userId: " + req.userId);
                    if (user._id == req.userId) {
                        console.log("correct user!");
                        console.log("req.body.name: " + body.public);

                        if(body.public === true) list.public = true;
                        if(body.published !== 'n/a') list.published = body.published;
                        if(body.publishedTime !== 'n/a') list.publishedTime = body.publishedTime;
                        list.name = body.name;
                        list.songs = body.songs;
                        list
                            .save()
                            .then(() => {
                                console.log("SUCCESS!!!");
                                return res.status(200).json({
                                    success: true,
                                    id: list._id,
                                    message: 'Playlist updated!',
                                })
                            })
                            .catch(error => {
                                console.log("FAILURE: " + JSON.stringify(error));
                                return res.status(404).json({
                                    error,
                                    message: 'Playlist not updated!',
                                })
                            })
                    }
                    else {
                        console.log("incorrect user!");
                        return res.status(400).json({ success: false, description: "authentication error" });
                    }
                });
            }
            asyncFindUser(playlist);
        })
    }
}
addCommentToPlaylist = async (req, res) => {
    console.log("Adding comment....--------------------------------------------")
    console.log(req.body)
    // Find playlist
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    let response = await Playlist.findByIdAndUpdate(
        {_id: req.body.playlistId },
        {$push: {comments: {'userName': req.body.userName, 'message': req.body.text}}}
        );
        console.log(response)
        return res.status(200).json({
            success: true,
            id: response._id
        })
    


}



module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    getPlaylistsFromUser,
    updatePlaylist,
    getPlaylistsWithName,
    addCommentToPlaylist,
}