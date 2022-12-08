// Similar component to SongCard, but dont allow editing ,only clicking

import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';

function SongCardLight(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(store?.currentPlayingSong?._id === song._id){
            if(store._id == null) {
                if(store?.currentPlayingSongIndex === index){
                    setActive(true);
                }
                else{
                    setActive(false);
                }
                
            } else{
                console.log("Song match found")
                console.log(song._id)
                setActive(true);
            }
            
        } else {
            if(active === true)
                setActive(false);
        }
    }, [store.currentPlayingSong,store.currentPlayingSongIndex])


    function handleClick(event) {
        event.stopPropagation();
        if (event.detail === 1) {
            console.log(song)
            store.setCurrentPlayingSong(song, index)
        }
    }

    let activeStyle = '#D4AF37'
    if(active) {
        activeStyle='#CE7F38'
    }


    return (
        <Box sx={{display:'flex', width: '100%', gap:1, borderRadius: 2,}}>
            <Box
            key={index}
            id={'song-' + index + '-card'}
            onClick={handleClick}
            
            sx={{
                width: '100%', 
                justifyContent: 'flex-start',
                padding:1,
                color: activeStyle
            
            }}

            >

                <Typography
                variant='h6'
                >
                    {index + 1}.{song.title} by {song.artist}
                </Typography>
                 

            </Box>
        </Box>
        
    );
}

export default SongCardLight;