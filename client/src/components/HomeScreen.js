import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import AppToolbar from './AppToolbar.js';
import MUIDeleteModal from './MUIDeleteModal';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import Statusbar from './Statusbar';
import Terminal from './Terminal.js';
/*
    This react component will have home screen, where there is a toolbar, 
    list section, and youtube player section
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);


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
            <Statusbar/>
        </Box>
    )
}

export default HomeScreen;