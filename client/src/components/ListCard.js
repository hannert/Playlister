import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Grid, IconButton, List, ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';
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

    if (songs !== null && expanded === true) {
        expandedList = <List
            onClick={handleInner}
            disabled={true}
        >
            {
            songs.map((song, index) => (
                <ListItem
                key={'playlist-' +(idNamePair._id) + '-song-' + (index)}>
                    {index + 1}.
                    {song.title}
                </ListItem>
            ))
            }
        </List>
    }



    let cardElement = 
        <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: '15px', display: 'flex', p: 1 , flexDirection: 'column'}}
        style={{ width: '100%'}}
        button
        // onClick={() => {console.log("Hello")}}
        // button
        // onClick={(event) => {
        //     handleLoadList(event, idNamePair._id)
        // }}
        onDoubleClick={toggleEdit}
        disableRipple={true}> 
            <Box sx={{justifyContent:'space-between', width: '100%'}}>
                <Box sx={{ p: 1, flexGrow: 1, flexDirection:'row' , float:'left'}}>
                    {playlistName}
                    <Box>
                        By: Creator
                    </Box>
                    {expandedList}

                </Box>
                <Box sx={{ float:'right'}}>
                    Likes and dislikes
                </Box>
            </Box>
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
        </ListItem>

    return (
        cardElement
    );
}

export default ListCard;