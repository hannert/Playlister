import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;
    const [active, setActive] = useState(false)
    useEffect(() => {
        if(store?.currentPlayingSong?._id === song._id){
            console.log("Song match found")
            setActive(true);
        } else {
            if(active === true)
                setActive(false);
        }
    }, [store.currentPlayingSong,store.currentPlayingSongIndex])




    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        console.log(index)
        console.log(song)
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        event.stopPropagation();
        if (event.detail === 1) {
            console.log(song)
            store.setCurrentPlayingSong(song, index)
        }
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }

    let activeStyle = '#2C2F70'
    if(active) {
        activeStyle='#D4AF37'
    }


    return (
        <Button
            key={index}
            id={'song-' + index + '-card'}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            sx={{
                padding: '20px',
                display:'flex',
                justifyContent:'flex-end'
            }}
            style={{
                backgroundColor:activeStyle
            }}
            onClick={handleClick}
            disableRipple={true}
            fullWidth
        >
            
            <Typography
            id={'song-' + index + '-link'}
            className="song-link"
            sx={{marginRight:'auto'}}
            >
            {index + 1}.{song.title} by {song.artist}

            </Typography>

            <Button
                size='medium'
                sx={{float:'right', borderRadius:'10px'}}
                variant='contained'
                id={"remove-song-" + index}
                value={"\u2715"}
                onClick={handleRemoveSong}>
                    <CloseIcon />
            </Button>

        </Button>
    );
}

export default SongCard;