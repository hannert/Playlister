// Similar component to SongCard, but dont allow editing ,only clicking

import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';

function SongCardLight(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;

    function handleClick(event) {
        event.stopPropagation();
        if (event.detail === 1) {
            console.log(song)
            store.setCurrentPlayingSong(song, index)
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <Box sx={{display:'flex', width: '100%', marginTop:1, marginBottom:1}}>
            <Button
            key={index}
            id={'song-' + index + '-card'}
            onClick={handleClick}
            
            sx={{width: '100%', justifyContent: 'flex-start'}}
            >
                <Box>

                </Box>
                <Typography>
                    {index + 1}.{song.title} by {song.artist}
                </Typography>
                 

            </Button>
        </Box>
        
    );
}

export default SongCardLight;