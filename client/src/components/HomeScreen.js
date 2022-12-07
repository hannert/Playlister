import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import AppToolbar from './AppToolbar.js';
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
        <Box sx={{height:'92.5%'}}>

            <Box id="list-selector-list" sx={{height:'90%'}}>   
                <AppToolbar />
                <Terminal/>
                
                <MUIDeleteModal />
                {modalJSX}
            </Box>
            <Box id="awesome" sx={{height:'10%',display:'flex', justifyContent:'center'}}>
                <Box>
                    <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
                <Typography variant="h2">Your Lists</Typography>
            </Box>
        </Box>)
}

export default HomeScreen;