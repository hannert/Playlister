import { Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection: 'column',
    gap: '12px',

};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentSong !== null}
            spacing={2}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                >
                <Typography
                    id="edit-song-modal-header" variant='h4' sx={{textAlign:'center'}}>
                    Edit Song
                </Typography>
                <div
                    id="edit-song-modal-content"
                    className="modal-center">
                <Grid container spacing={2} sx={{textAlign:'center', mt:3, mb:2}}>
                    <Grid item md={4}>
                        <Typography variant='h6'>
                            Title:
                        </Typography>
                    </Grid>
                    <Grid item md={8}>
                    <TextField
                        id="edit-song-modal-title-textfield" 
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} />
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='h6'>
                            Artist:
                        </Typography>
                    </Grid>
                    <Grid item md={8}>
                    <TextField 
                        id="edit-song-modal-artist-textfield" 
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} />
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='h6'>
                            YouTube ID:
                        </Typography>
                    </Grid>
                    <Grid item md={8}>
                    <TextField 
                        id="edit-song-modal-youTubeId-textfield" 
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} />
                    </Grid>
                </Grid>
                </div>
                <div className="modal-south">
                    <Grid container sx={{textAlign:'center'}}>
                        <Grid item md={6}>
                            <Button 
                                id="dialog-yes-button"
                                variant='contained'
                                onClick={handleConfirmEditSong}>
                                Confirm
                            </Button>                            
                        </Grid>
                        <Grid item md={6}>
                            <Button 
                                id="dialog-no-button"
                                variant='contained'
                                onClick={handleCancelEditSong} >
                                Cancel
                            </Button>        
                        </Grid>
                    </Grid>



                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}