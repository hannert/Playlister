import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <header className="dialog-header">
                                Delete the {name} playlist?
                            </header> 
                        </Grid>
                        <Grid item md={6} sx={{textAlign:'center', mt:3, mb:1}}>
                            <Button
                            variant='contained'
                            onClick={handleDeleteList}>
                                Confirm
                            </Button>
                        </Grid>
                        <Grid item md={6} sx={{textAlign:'center', mt:3, mb:1}}>
                            <Button
                            variant='contained'
                            onClick={handleCloseModal}>
                                Cancel
                            </Button>                            
                        </Grid>
                    </Grid>
                
                <div id="confirm-cancel-container">
                    

                </div>
            </div>
            </Box>
        </Modal>
    );
}