import { Box, Grid } from "@mui/material";

import ListBox from './ListBox';
import PlayerBox from './PlayerBox';

//  To have the lists shown on the left and the player on the right

export default function Terminal (){



    return (
        <Box 
        id='Terminal'
        height='90%'
        >
           <Grid
            container
            height='100%'
            >
                <Grid item xs={7} sx={{height:'100%', overflow:'auto'}}>
                        <ListBox />
                    
                </Grid>
                <Grid item xs={5} sx={{height:'100%'}}>
                    <PlayerBox /> 
                </Grid>
    
            </Grid> 
        </Box>
        
    )
}