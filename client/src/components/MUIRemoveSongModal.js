import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useContext } from 'react';
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
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.currentSong) {
        name = store.currentSong.name;
    }


    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentModal === "REMOVE_SONG"}
        >
            <Box sx={style}>
            <div
            id="remove-song-modal"
            data-animation="slideInOutLeft">
                <Grid container>
                    <Grid item md={12}>
                        <Box sx={{mb:2}}>
                            <Typography variant='h5'>
                                Remove {songTitle}?
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item md={12} sx={{mb:3}}>
                        <Typography>
                            Are you sure you wish to permanently remove {songTitle} from the playlist?
                        </Typography>                        
                    </Grid>
                    <Grid item md={6} sx={{textAlign:'center'}}>
                        <Button
                        variant='contained'
                        id="remove-song-confirm-button" 
                        onClick={handleConfirmRemoveSong}>
                            Confirm
                        </Button>
                    </Grid>
                    <Grid item md={6} sx={{textAlign:'center'}}>
                        <Button
                        variant='contained'
                        id="remove-song-cancel-button" 
                        onClick={handleCancelRemoveSong}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
        </Modal>
    );
}