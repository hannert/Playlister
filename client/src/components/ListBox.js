import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';



import { Box, List } from "@mui/material";

import ListCard from './ListCard.js';

// This react component will contain all of the playlists, ListPortion


export default function ListBox () {
    const { store } = useContext(GlobalStoreContext);
    
    let content = "";
    if (store) {
        content = 
        <List sx={{ height:'100%', width: '90%', left: '5%'}}>
        {
            store.idNamePairs.map((pair) => (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />
            ))
        }
        </List>;
    }


    return (
        <Box height='100%'>
            List-Box
            {content}
        </Box>
    )
}