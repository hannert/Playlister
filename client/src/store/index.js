import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import jsTPS from '../common/jsTPS'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import api from './store-request-api'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    PUBLISH_PLAYLIST: "PUBLISH_PLAYLIST",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SHOW_ERROR: 'SHOW_ERROR',
    GET_PLAYLIST_BY_ID: "GET_PLAYLIST_BY_ID",
    SET_CURRENT_PLAYING_SONG: "SET_CURRENT_PLAYING_SONG",
    PLAY_PLAYLIST: "PLAY_PLAYLIST",
    SKIP_SONG: "SKIP_SONG",
    LOAD_ALL_PLAYLISTS: "LOAD_ALL_PLAYLISTS",
    GET_PLAYLISTS_BY_USER: "GET_PLAYLISTS_BY_USER",
    GET_PLAYLIST_BY_NAME: "GET_PLAYLIST_BY_NAME",
    GET_PLAYLIST_IN_HOME: "GET_PLAYLIST_IN_HOME",
    GET_PLAYLISTS_OF_LOGGED_IN: "GET_PLAYLISTS_OF_LOGGED_IN",
    FETCH_COMMENTS: "FETCH_COMMENTS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

const CurrentTab = {
    HOME: "HOME",
    ALL: "ALL",
    USER: "USER"
}


// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        currentTab : CurrentModal.HOME,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        recentExpandedList: null,
        currentPlayingList: null,
        currentPlayingSong: null,
        currentPlayingSongIndex: 0,
        currentQuery: null

    });
    const history = useHistory();

    console.log("inside useGlobalStore");
    console.log('store history:', history)
    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: ", auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            case GlobalStoreActionType.PUBLISH_PLAYLIST: {
                return setStore({
                    ...store,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist
                })
            }
            
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    ...store,

                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    ...store,

                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            // GET ALL PUBLIC PLAYLISTS
            case GlobalStoreActionType.LOAD_ALL_PLAYLISTS: {
                return setStore({
                    ...store,
                    currentTab: CurrentTab.ALL,
                    idNamePairs: payload,
                })
            }

            case GlobalStoreActionType.GET_PLAYLISTS_BY_USER: {
                return setStore({
                    ...store,
                    currentTab: CurrentTab.USER,
                    idNamePairs: payload.playlist,
                    currentQuery: payload.query
                })
            }

            case GlobalStoreActionType.GET_PLAYLIST_BY_NAME: {
                return setStore({
                    ...store,
                    currentTab: CurrentTab.ALL,
                    idNamePairs: payload.playlist,
                    currentQuery: payload.query
                })
            }
            
            // In home, search lists get
            case GlobalStoreActionType.GET_PLAYLIST_IN_HOME: {
                return setStore({
                    ...store,
                    currentTab: CurrentTab.HOME,
                    idNamePairs: payload.playlist,
                    currentQuery: payload.query
                })
            }

            case GlobalStoreActionType.GET_PLAYLISTS_OF_LOGGED_IN: {
                return setStore({
                    ...store,
                    currentTab: CurrentTab.HOME,
                    idNamePairs: payload
                })
            }



            case GlobalStoreActionType.GET_PLAYLIST_BY_ID: {
                return setStore({
                    ...store,
                    currentList: payload,
                    recentlyExpandedList: payload
                })
            }
            case  GlobalStoreActionType.SET_CURRENT_PLAYING_SONG: {
                console.log("Setting current playing song")
                return setStore({
                    ...store,
                    currentPlayingSong: payload.song,
                    currentPlayingSongIndex: payload.index
                })
            }

            case GlobalStoreActionType.PLAY_PLAYLIST: {
                console.log("Playing playlist")
                return setStore({
                    ...store,
                    currentPlayingList: payload.playlist,
                    currentPlayingSongIndex: payload.newIndex,
                    currentPlayingSong: payload.song
                })
            }

            case GlobalStoreActionType.FETCH_COMMENTS: {
                console.log("comments are a go!")
                return setStore({
                    ...store,
                    currentPlayingList: payload.playlist
                })
            }
            
            case GlobalStoreActionType.SKIP_SONG: {
                console.log("Skipping song")
                return setStore({
                    ...store,
                    currentPlayingSongIndex: payload.index
                })
            }

            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPlayingSong: payload.newSong
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    ...store,
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    ...store,

                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist, false);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    store.publishPlaylist = function (id) {
        // GET THE LIST
        async function asyncPublishPlaylist(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                let publishDate = ''
                let today = new Date();
                let todayISO = today.toISOString();

                let mm = today.toLocaleString('default', { month: 'short' });
                let dd = today.getDate();
                let yy = today.getFullYear();
                publishDate = mm + ' ' + dd + ', ' + yy;

                playlist.public = true;
                playlist.published = publishDate;
                playlist.publishedTime = todayISO;

                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist, false);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.PUBLISH_PLAYLIST,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncPublishPlaylist(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.userName);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            store.loadIdNamePairs();
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // Function to get all ID pairs of logged in user ( Home Screen )
    store.loadIdNamePairs = function () {
        console.log("Load ID name pairs ----------")
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                console.log("Pairs Array")
                console.log(pairsArray)
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.getLoggedInUserPlaylists = function() {
        console.log("Load ID name pairs ----------")
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                console.log("Pairs Array")
                console.log(pairsArray)
                storeReducer({
                    type: GlobalStoreActionType.GET_PLAYLISTS_OF_LOGGED_IN,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }
    // This function will get all public playlists in the database
    store.getAllPublicPlaylists = function () {
        console.log("Getting all playlists");
        async function asyncGetAllPlaylists() {
            const response = await api.getPlaylists();
            if (response.data.success) {
                console.log(response.data.data)
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ALL_PLAYLISTS,
                    payload: pairsArray
                })
                console.log(pairsArray)
            }

        }
        asyncGetAllPlaylists();

    }

    store.getUserPlaylists = function (userName) {
        console.log("Getting playlists from user:" + userName);
        async function asyncGetAllPlaylists(userName) {
            const response = await api.getPlaylistsFromUser(userName);
            if (response.data.success) {
                console.log(response.data.data)
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.GET_PLAYLISTS_BY_USER,
                    payload: {playlist: pairsArray, query: userName}
                })
                console.log(pairsArray)
            }

        }
        asyncGetAllPlaylists(userName);
    }

    store.getPlaylistsByName = function (playlistName) {
        console.log("Getting playlists with name " + playlistName)
        async function asyncGetAllPlaylists(playlistName) {
            const response = await api.getPlaylistsWithName(playlistName);
            if (response.data.success) {
                console.log(response.data.data)
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.GET_PLAYLIST_BY_NAME,
                    payload: {playlist: pairsArray, query: playlistName}
                    
                })
                console.log(pairsArray)
            }

        }
        asyncGetAllPlaylists(playlistName);
    }

    store.getPlaylistsInHome = function (playlistName) {
        console.log("Getting playlists with name " + playlistName)
        async function asyncGetAllPlaylists(playlistName) {
            const response = await api.getPlaylistsFromHome(playlistName);
            if (response.data.success) {
                console.log(response.data.data)
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.GET_PLAYLIST_IN_HOME,
                    payload: {playlist: pairsArray, query: playlistName}
                })
                console.log(pairsArray)
            }

        }
        asyncGetAllPlaylists(playlistName);
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.unmarkListForDeletion = function () {
        store.hideModals();
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            store.loadIdNamePairs();
            if (response.data.success) {
                // store.loadIdNamePairs(); // Race condition...???
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }



    store.getListById = function(id) {
        async function asyncGetList(id) {
            let response = await api.getPlaylistById(id);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.GET_PLAYLIST_BY_ID,
                    payload: response.data.playlist
                })
            }

        }
        asyncGetList(id);
    }

    // Play playlist -> Increment Listen count?
    store.playPlaylist = function (id) {
        async function asyncGetList(id) {
            let response = await api.getPlaylistById(id);
            if(response.data.success) { // Playlist found
                // Check if playlist is not empty
                let playlist = response.data.playlist;
                let firstSong = null
                if(playlist.length !== 0){
                    console.log("Nonempty playlist found")
                    console.log(playlist.songs[0])
                    firstSong = playlist.songs[0]
                }

                storeReducer({
                    type: GlobalStoreActionType.PLAY_PLAYLIST,
                    payload: {playlist: response.data.playlist, song: firstSong, newIndex: 0}
                })
                if (playlist.public === true){
                    async function asyncAddListen(id) {
                    let response = await api.updatePlaylistById(id, {}, true);
                    if(response.data.success) { // Playlist found
                    }

                    }
                    asyncAddListen(id);
                }
                
            }

        }

        asyncGetList(id);
        
    }

    store.setCurrentPlayingSong = function (song, index) {
        console.log(song)
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_PLAYING_SONG,
            payload: {song: song, index: index}
        })
    }

    store.playSongAtIndex = function (id, index) {
        async function asyncGetList(id, index) {
            let response = await api.getPlaylistById(id);
            if(response.data.success) { // Playlist found
                // Check if playlist is not empty
                let playlist = response.data.playlist;
                let firstSong = null
                if(playlist.length !== 0){
                    console.log("Nonempty playlist found")
                    console.log(playlist.songs[index])
                    firstSong = playlist.songs[index]
                }

                storeReducer({
                    type: GlobalStoreActionType.PLAY_PLAYLIST,
                    payload: {
                        playlist: response.data.playlist, 
                        song: firstSong,
                        newIndex: index,
                    }
                })
                
            }

        }

        asyncGetList(id, index);
    }

    // LIKE A PLAYLIST
    store.likePlaylist = function (id) {



    }

    store.dislikePlaylist = function (id) {

    }

    store.commentOnPlayingPlaylist = function (comment) {
        console.log("Commenting on " + store?.currentPlayingList?._id + " about " + comment + " by user:" + auth.user.userName)
        
        let packagedComment = {user:auth.userName, body:comment}

        async function asyncAddComment(comment){
            // GET Playlist first
            console.log(store.currentPlayingList)
            console.log(auth.user.userName)
            console.log(comment)
            let response = await api.addCommentToPlaylist(store?.currentPlayingList._id, auth.user.userName, comment)
            if(response.data.success){
                // Get updated list
                async function getPlaylistById(id){
                    let response = await api.getPlaylistById(id);
                    if(response.data.success) {
                        console.log(response.data.playlist)
                        storeReducer({
                            type: GlobalStoreActionType.FETCH_COMMENTS,
                            payload: {playlist: response.data.playlist}
                        })
                    }

                }

                getPlaylistById(response.data.id)
                
                
            }

        }
    
        asyncAddComment(comment)
    
    
    
    
    }

    store.duplicatePlaylist = function (id) {
        console.log("In store, duplicating " + id);
        async function asyncGetList(id){
            // Get the playlist first
            let response = await api.getPlaylistById(id);
            if(response.data.success) {
                console.log("successfully retreived list with id " + id);
                let dupName = response.data.playlist.name;
                let dupSongs = response.data.playlist.songs;
                let newSongs = dupSongs.map(({_id, ...rest}) => {
                    return rest;
                })

                async function createPlaylist(newListName, songs, email, userName){
                    console.log("Duplicate songs: ", songs)
                    const response = await api.createPlaylist(newListName, songs, email, userName)
                    if(response.status === 201){
                        console.log("Successfully duplicated list!")
                        let newList = response.data.playlist;
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload: newList
                        });

                        store.getLoggedInUserPlaylists();
                    }
                    
                }

                createPlaylist(dupName, newSongs, auth.user.email, auth.user.userName)


            }


        }

        asyncGetList(id);
    }

    // Store sorting functions, sort locally?
    store.sortByName = function () {
        let tempList = store.idNamePairs;
        let sorted = tempList.sort((listOne, listTwo) => (listOne.name > listTwo.name ? 1 : -1))
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: sorted
        })
        console.log(sorted)
    }
    store.sortByPublishDate = function () {
        let tempList = store.idNamePairs;
        // let sorted = tempList.sort((listOne, listTwo) => (listOne.publishedTime > listTwo.publishedTime ? -1 : 1))
        let sorted = tempList.sort((listOne, listTwo) => {
            if(listOne.publishedTime > listTwo.publishedTime){
                return -1
            } else if (listOne.publishedTime < listTwo.publishedTime) {
                return 1
            }
            else {
                return 1
            }
        })

        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: sorted
        })
        console.log(sorted);
    }
    store.sortByListens = function () {
        let tempList = store.idNamePairs;
        let sorted = tempList.sort((listOne, listTwo) => (listOne.listens > listTwo.listens ? -1 : 1))
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: sorted
        })
        console.log(sorted)
    }
    store.sortByLikes = function () {
        let tempList = store.idNamePairs;
        let sorted = tempList.sort((listOne, listTwo) => (listOne.likes > listTwo.likes ? -1 : 1))
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: sorted
        })
        console.log(sorted)
    }
    store.sortByDislikes = function () {
        let tempList = store.idNamePairs;
        let sorted = tempList.sort((listOne, listTwo) => (listOne.dislikes > listTwo.dislikes ? -1 : 1))
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: sorted
        })
        console.log(sorted)
    }

    store.commentOnPlaylist = function () {

    }



    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList, false);
            if (response.data.success) {
                console.log(response.data)
                console.log(response.data)
                
                let newPlayingSong = store.currentList.songs[store.currentPlayingSongIndex]
                console.log(newPlayingSong)
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {
                        playlist: store.currentList,
                        newSong: newPlayingSong
                    }
                });
            }
        }
        asyncUpdateCurrentList();
    }

    store.clearAllTransactions = function () {
        tps.clearAllTransactions();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.getCurrentSongIndex = function () {
        return store.currentPlayingSongIndex
    }

    store.skipSong = function (index, len) {
        storeReducer({
            type: GlobalStoreActionType.SKIP_SONG,
            payload: {index: index, length: len}
        })
    }



    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider }

