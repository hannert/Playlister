import ClearIcon from '@mui/icons-material/Clear';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Button, Grid, IconButton, InputAdornment, Popper, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';

export default function AppToolbar () {
    const { store } = useContext(GlobalStoreContext);
    const [alignment, setAlignment] = React.useState('HOME');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = useState("");

    useEffect(()=>{
        console.log("Tab changed")
        setAlignment(store.currentTab)
    }, [store.currentTab])

    const handleChange = (e, newAlignment) => {
        if(newAlignment !== null)
            setAlignment(newAlignment);
    }

    function handleHome () {
        console.log("Home clicked");
        store.getLoggedInUserPlaylists();
    }
    function handleAll () {
        console.log("ALL clicked")
        store.getAllPublicPlaylists();
    }
    function handleUser() {
        console.log("User clicked")
        store.getUserPlaylists('');
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            console.log("Search for " + text)
            if(alignment === 'USER'){
                store.getUserPlaylists(text)
            }
            if(alignment === 'ALL'){
                store.getPlaylistsByName(text)
            }
            if(alignment === 'HOME'){
                store.getPlaylistsInHome(text)
            }
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleClear() {
        console.log("clear")
        setText('');
        if(alignment === 'USER'){
            store.getUserPlaylists('')
        }
        if(alignment === 'ALL'){
            store.getPlaylistsByName('')
        }
        if(alignment === 'HOME'){
            store.getPlaylistsInHome('')
        }
    }

    const handleSortClick = (event) => {
        console.log("open sort")
        setAnchorEl(anchorEl ? null : event.currentTarget );
    }

    const open = Boolean(anchorEl)


    function handleSortByName(event){
        event.stopPropagation();
        store.sortByName();
    }
    function handleSortbyPublishDate(event){
        event.stopPropagation();
        store.sortByPublishDate();
    }
    function handleSortByListens(event){
        event.stopPropagation();
        store.sortByListens();
    }
    function handleSortByLikes(event){
        event.stopPropagation();
        store.sortByLikes();
    }
    function handleSortByDislikes(event){
        event.stopPropagation();
        store.sortByDislikes();
    }

    return (
        <Box>
            <Grid container>
                <Grid item xs={3} >
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        sx={{height:'100%'}}
                    >
                        <ToggleButton value='HOME' onClick={handleHome}><HomeIcon/></ToggleButton>
                        <ToggleButton value='ALL' onClick={handleAll}><GroupsIcon/></ToggleButton>
                        <ToggleButton value='USER' onClick={handleUser}><PersonIcon/></ToggleButton>
                    </ToggleButtonGroup>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                    fullWidth
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    value={text}
                    InputProps = {{
                        endAdornment: 
                        <InputAdornment position='end'>
                            <IconButton onClick={handleClear}>
                                <ClearIcon/>
                            </IconButton>
                        </InputAdornment>
                    }}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={3} sx={{display:'flex', justifyContent:'flex-end'}}>
                    <Button onClick={handleSortClick}>
                        Sort By
                        <SortIcon />
                    </Button>
                    <Popper open={open} anchorEl={anchorEl} placement='bottom-end' >
                        <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'white', p:1}}>

                            <Button variant='contained' onClick={handleSortByName}>
                                Name (A - Z)
                            </Button>
                            <Button variant='contained' onClick={handleSortbyPublishDate}>
                                Publish Date (Newest)
                            </Button>
                            <Button variant='contained' onClick={handleSortByListens}>
                                Listens (High - Low)
                            </Button>
                            <Button variant='contained' onClick={handleSortByLikes}>
                                Likes (High - Low)
                            </Button>
                            <Button variant='contained' onClick={handleSortByDislikes}>
                                Dislikes (High- Low)
                            </Button>
                        </Box>
                    </Popper>
                    
                </Grid>
            </Grid>
            
        </Box>
    )
}