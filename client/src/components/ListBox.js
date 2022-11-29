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
        <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
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
        <Box id='List-Box'>
            List-Box
            {content}
        </Box>
    )
}