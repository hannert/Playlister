import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    // Get home tab on site enter 
    useEffect(() => {
        store.getLoggedInUserPlaylists();
    }, []);
    
    useEffect(() => {

    }, [store.currentTab])

    function handleCreateNewList() {
        store.createNewList();
    }

    let homeBar = ""
    if(store.currentTab === 'HOME'){
        homeBar = 
        <Box id="awesome" sx={{height:'10%',display:'flex', justifyContent:'center'}}>
        <Box>
            <IconButton 
            color="primary" 
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
            fullHeight
            >
                <AddIcon />
            </IconButton>
        </Box>
        <Typography variant="h2">Your Lists</Typography>
    </Box>
    }
    else if(store.currentTab === 'USER' || store.currentTab === 'ALL'){
        console.log(store.currentQuery)
        if(store.currentQuery === ''){
            homeBar = <Box></Box>
        }
        else if(store.currentQuery !== null){
            homeBar = 
            <Box id="awesome" sx={{height:'10%',display:'flex', justifyContent:'center'}}>
                <Typography variant="h2">{store.currentQuery} Lists</Typography>
            </Box>
        }
        
    }

    return (
        homeBar
    );
}

export default Statusbar;