import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
    display: 'flex' 
};



export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);
    const [ error, setError ] = useState(auth.errorMessage);

    useEffect(() => {
        setError(auth.errorMessage)
    }, [auth.errorMessage])

    function handleCloseErrorModal() {
        auth.hideModal();
    }

    return (
        <Modal
            open={auth.isModalActive() == true}
        >
            <Box sx={style}>
            <div
            id="error-modal"
            className="modal is-visible"
            >
                <Alert 
                severity="error"
                action={
                    <Button color='inherit' size='large' onClick={handleCloseErrorModal}>
                        <CloseIcon />
                    </Button>
                }>
                    <AlertTitle>Error</AlertTitle>
                    <div>{error}</div>
                    
                </Alert>

            </div>
            </Box>
        </Modal>
    );
}