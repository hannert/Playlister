import GroupsIcon from '@mui/icons-material/Groups';
import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Button, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function AppToolbar () {
    const { store } = useContext(GlobalStoreContext);
    const [alignment, setAlignment] = React.useState('HOME');

    const handleChange = (e, newAlignment) => {
        if(newAlignment !== null)
            setAlignment(newAlignment);
    }

    function handleHome () {
        console.log("Home clicked");
        store.loadIdNamePairs();
    }
    function handleAll () {
        console.log("ALL clicked")
        store.getAllPublicPlaylists();
    }



    return (
        <Box>
            <Grid container>
                <Grid item xs={3} >
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value='HOME' onClick={handleHome}><HomeIcon/></ToggleButton>
                        <ToggleButton value='ALL' onClick={handleAll}><GroupsIcon/></ToggleButton>
                        <ToggleButton value='USER'><PersonIcon/></ToggleButton>
                    </ToggleButtonGroup>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                    fullWidth
                    
                    >

                    </TextField>
                </Grid>
                <Grid item xs={3} sx={{display:'flex', justifyContent:'flex-end'}}>
                    <Button>
                        Sort By
                    </Button>
                    <IconButton>
                        <SortIcon />
                    </IconButton>
                </Grid>
            </Grid>
            
        </Box>
    )
}