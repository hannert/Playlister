import React, { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import MUIDeleteModal from './MUIDeleteModal';


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
    // let listCard = "";
    // if (store) {
    //     listCard = 
    //         <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
    //         {
    //             store.idNamePairs.map((pair) => (
    //                 <ListCard
    //                     key={pair._id}
    //                     idNamePair={pair}
    //                     selected={false}
    //                 />
    //             ))
    //         }
    //         </List>;
    // }
    return (
        <div id="playlist-selector">
            Home screen
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                <Terminal/>
                <MUIDeleteModal />
            </div>
        </div>)
}

export default HomeScreen;