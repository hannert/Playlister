import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import MUIDeleteModal from './MUIDeleteModal';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import Terminal from './Terminal.js';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
/*
    This react component will have home screen, where there is a toolbar, 
    list section, and youtube player section
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let modalJSX = '';
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }


    return (
        <Box id="playlist-selector">
            Home screen
            <Box id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </Box>
            <Box id="list-selector-list"
            >   
                <Terminal/>
                
                <MUIDeleteModal />
                {modalJSX}
            </Box>
        </Box>)
}

export default HomeScreen;