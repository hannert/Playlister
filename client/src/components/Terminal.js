import { Grid } from "@mui/material";


import ListBox from './ListBox';
import PlayerBox from './PlayerBox';

//  To have the lists shown on the left and the player on the right

export default function Terminal (){



    return (
        <Grid
        container>
            <Grid item xs={7}>
                <ListBox />
            </Grid>
            <Grid item xs={5}>
                <PlayerBox /> 
            </Grid>
  
        </Grid>
    )
}