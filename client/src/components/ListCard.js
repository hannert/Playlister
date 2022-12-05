import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Button, Grid, IconButton, List } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';
import SongCard from './SongCard';
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
        console.log("expanded list changed")
        console.log(store.recentlyExpandedList)
        console.log(idNamePair._id)
        
        if(store.recentlyExpandedList){ 
            // If the newly queried list is the same one as this list card
            if(store.recentlyExpandedList._id === idNamePair._id){
                console.log("MATCH FOUND!!!!")
                setSongs(store.recentlyExpandedList.songs)
            }
        }
    }, [store.recentlyExpandedList])

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    async function handleExpand(event, id) {
        // Handle expanding or collapsing the playlist
        //Playlist retrieved with call to store, sets recentlyExpandedList, 
        //list cards check if list is matching, then update their own state with playlist.
        console.log("Expand");
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("Get " + event.target.id);

            // CHANGE THE CURRENT LIST
            let list = store.getListById(id);
            console.log(list)
        }
        setExpanded(true);
    }
    function handleCollapse() {
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

    function handleAddNewSong() {
        store.addNewSong();
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

    if (expanded === true) {
        expandedList = <Box sx={{backgroundColor:'burlywood'}}> Expanded list! </Box>
    }

    // Map the data to SongCard components
    if (songs !== null && expanded === true) {
        expandedList = 
        <List
            
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
            sx={{p: 1, width:'95%', justifySelf:'center'}}
            onClick={handleAddNewSong}
            >
                <AddIcon/>
            </Button>
        </List>
    }

    let listButtons = <Box></Box>

    if(expanded === true) {
        listButtons = <Box sx={{display:'flex', justifyContent:'flex-end', width:'100%', gap:1}}>
            <Button variant='contained'>
                Delete
            </Button>
            <Button variant='contained'>
                Duplicate
            </Button>

        </Box>
    }


    let cardElement = 
        <Box
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: '15px', display: 'flex', p: 1 , flexDirection: 'column'}}
        style={{ width: '100%'}}
        // onClick={() => {console.log("Hello")}}
        // button
        // onClick={(event) => {
        //     handleLoadList(event, idNamePair._id)
        // }}
        > 
            <Box sx={{justifyContent:'space-between', width: '100%'}}>
                <Box sx={{ p: 1, flexGrow: 1, flexDirection:'row' , float:'left'}}>
                    <Box onDoubleClick={toggleEdit}>
                        {playlistName}
                    </Box>
                    
                    <Box>
                        By: Creator
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
                            Published: hehe...
                        </Box>
                    </Grid>
                    <Grid item xs={3} sx={{p:1, display:'flex'}}>
                        <Box sx={{alignSelf:'flex-end'}}> Lifetime: </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{float:'right'}}>
                            {expanded
                            ? <IconButton onClick={handleCollapse}>
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