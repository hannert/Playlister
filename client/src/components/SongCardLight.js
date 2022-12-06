// Similar component to SongCard, but dont allow editing ,only clicking

import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
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
        <Typography
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onClick={handleClick}
        >
            {index + 1}.
            <Typography
            id={'song-' + index + '-link'}
            >
                
                {song.title} by {song.artist}
            </Typography>
        </Typography>
    );
}

export default SongCardLight;