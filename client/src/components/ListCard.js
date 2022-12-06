import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Button, Grid, IconButton, List } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';
import SongCard from './SongCard';
import SongCardLight from './SongCardLight';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [songs, setSongs] = useState(null);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    useEffect(() => {
        if(store.recentlyExpandedList){ 
            // If the newly queried list is the same one as this list card
            if(store.recentlyExpandedList._id === idNamePair._id){
                setSongs(store.recentlyExpandedList.songs)
            } else{
                setExpanded(false)
            }
        }
    }, [store.recentlyExpandedList])

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    async function handleExpand(event, id) {
        // Handle expanding or collapsing the playlist
        //Playlist retrieved with call to store, sets recentlyExpandedList, 
        //list cards check if list is matching, then update their own state with playlist.
        console.log("Expand");
        event.stopPropagation();
        if (!event.target.disabled) {
            let list = store.getListById(id);
        }
        setExpanded(true);
    }
    function handleCollapse(event) {
        event.stopPropagation();

        setExpanded(false);
    }

    // Need function to retreive the list songs when expanded
    function handleInner(e) {
        e.stopPropagation();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handlePlay(event, id) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("Get " + event.target.id);

            // Set currentlist to the clicked on one, set playing song index to 0
            store.playPlaylist(id);
        }    
    }

    function handleUndo(event) {
        event.stopPropagation();
        console.log("Undo")
    }
    function handleRedo(event) {
        event.stopPropagation();
        console.log("Redo")
    }
    function handlePublish(event) {
        event.stopPropagation();
        console.log("Publish " + idNamePair._id)
        store.publishPlaylist(idNamePair._id)
    }


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let playlistName = 
        <Box> 
            {idNamePair.name}
        </Box>

    if(editActive) 
        playlistName = 
            <TextField
            margin="normal"
            required
            // fullWidth
            id={"list-" + idNamePair._id}
            label="Playlist Name"
            name="name"
            autoComplete="Playlist Name"
            className='list-card'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={idNamePair.name}
            // inputProps={{style: {fontSize: 48}}}
            // InputLabelProps={{style: {fontSize: 24}}}
            autoFocus
            />

    let expandedList = 
        <Box></Box>

    // Map the data to SongCard components
    if (songs !== null && expanded === true) {
        if(idNamePair.public === true){
            console.log("This list is public...")
            // The expanded list is public, so it can't be edited in any way
            expandedList = 
            <List
                sx={{height:'100%', overflow:'auto'}}
            >
                {
                songs?.map((song, index) => (
                    <SongCardLight
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                    />
                ))
                }

            </List>

        }
        else if(idNamePair.public === false){
            console.log("This list is NOT pulic...")
            expandedList = 
            <List
                sx={{height:'100%', overflow:'auto'}}
                >
                {
                songs?.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
                }
                <Button 
                variant='contained' 
                sx={{p: 1, width:'100%', justifySelf:'center'}}
                onClick={(event) => {handleAddNewSong(event)}}
                >
                    <AddIcon/>
                </Button>
            </List>
        }
    }

    let listButtons = <Box></Box>

    // If list is expanded, find out if the list is public or not
    // If list is not public, give user option to edit the playlist
    // If list is public, allow users to only play, delete, or duplicate
    if(expanded === true) {
        let transactions = ""
        let publishButton = ""

        // If the current open list is public
        if(idNamePair.public === false){
            console.log(store?.currentList)
            console.log(idNamePair)
            console.log("currentlist is not public")
            transactions = <Box sx={{marginRight:'auto', display:'flex', gap:1}}>
                <Button variant='contained' onClick={(event) => {handleUndo(event)}} >
                    Undo
                </Button>
                <Button variant='contained' onClick={(event) => {handleRedo(event)}}>
                    Redo
                </Button>
            </Box>
            publishButton = <Button variant='contained' onClick={(event) => {handlePublish(event)}}>
                Publish
            </Button>

        }


        listButtons = <Box sx={{display:'flex', justifyContent:'flex-end', width:'100%', gap:1}}>
            {transactions}            
            {publishButton}
            <Button variant='contained' onClick={(event) => {handleDeleteList(event, idNamePair._id)}}>
                Delete
            </Button>
            <Button variant='contained'>
                Duplicate
            </Button>

        </Box>
    }

    let publishDate = ""

    if(idNamePair.published !== 'n/a'){
        publishDate = 
        <Box>
            Published: {idNamePair.published}
        </Box>;
    }



    let cardElement = 
        <Box
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: '15px', display: 'flex', p: 1 , flexDirection: 'column', transition:'all 0.5s ease'}}
        style={{ maxHeight: '100%', width: '100%', backgroundColor:'#D4A0DC'}}
        onClick={(event) => {handlePlay(event, idNamePair._id)}}
        > 
            <Box sx={{justifyContent:'space-between', width: '100%'}}>
                <Box sx={{ p: 1, flexGrow: 1, flexDirection:'row' , float:'left'}}>
                    <Box onDoubleClick={toggleEdit}>
                        {playlistName}
                    </Box>
                    
                    <Box>
                        By: {idNamePair.ownerUsername}
                        
                    </Box>
                </Box>
                <Box sx={{ float:'right'}}>
                    Likes and dislikes
                </Box>
            </Box>
            {expandedList}
            {listButtons}
            <Box sx={{p:1, display:'flex', justifyContent:'flex-end', width: '100%'}}>
                
                <Grid container>
                    <Grid item xs={7} sx={{p:1, display:'flex'}}>
                        <Box sx ={{alignSelf:'flex-end'}}>
                            {publishDate}
                        </Box>
                    </Grid>
                    <Grid item xs={3} sx={{p:1, display:'flex'}}>
                        <Box sx={{alignSelf:'flex-end'}}> Lifetime: </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{float:'right'}}>
                            {expanded
                            ? <IconButton onClick={(event) => {handleCollapse(event)}}>
                                <KeyboardDoubleArrowUpIcon/>
                                
                              </IconButton>
                            : <IconButton onClick={(event) => {handleExpand(event,idNamePair._id)}}>
                                <KeyboardDoubleArrowDownIcon/>
                              </IconButton>
                            }
                            
                        </Box>
                        
                    </Grid>

                </Grid>

                
                    
            </Box>
        </Box>

    return (
        cardElement
    );
}

export default ListCard;