import ClearIcon from '@mui/icons-material/Clear';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

export default function AppToolbar () {
    const { store } = useContext(GlobalStoreContext);
    const [alignment, setAlignment] = React.useState('HOME');
    const [text, setText] = useState("");

    const handleChange = (e, newAlignment) => {
        if(newAlignment !== null)
            setAlignment(newAlignment);
    }

    function handleHome () {
        console.log("Home clicked");
        store.loadIdNamePairs();
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


    return (
        <Box>
            <Grid container>
                <Grid item xs={3} >
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleChange}
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
                    <Button>
                        Sort By
                    </Button>
                    <IconButton>
                        <SortIcon />
                    </IconButton>
                </Grid>
            </Grid>
            
        </Box>
    )
}