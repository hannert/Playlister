import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
export default function AppToolbar () {

    return (
        <Box>
            <Grid container>
                <Grid item xs={3} >
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                    <IconButton>
                        <GroupsIcon />
                    </IconButton>
                    <IconButton>    
                        <PersonIcon />
                    </IconButton>
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