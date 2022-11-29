
import React from 'react';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import YouTubeBox from './YouTubeBox';

//  To be renamed
export default function PlayerBox () {
    const [alignment, setAlignment] = React.useState('player');

    const handleChange = (e, newAlignment) => {
        console.log(newAlignment)
        setAlignment(newAlignment);
    }

    let content = "";

    if(alignment === 'player'){
        content = 
            <YouTubeBox />
    } 
    if(alignment === 'comments'){
        content = 
            <Box>
                This should be the COMMENT section 
            </Box>
    }
    

    return (
        <Box>
            PlayerBox, Have Select Btwn Video And Comment

            {/* <PlayerBoxToolbar /> */}
            <Box>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value='player'>Player</ToggleButton>
                    <ToggleButton value='comments'>Comments</ToggleButton>
                </ToggleButtonGroup>
                {content}
            </Box>
        </Box>
    )



}