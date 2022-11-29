
import React from 'react';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function PlayerBoxToolbar () {
    const [alignment, setAlignment] = React.useState('player');

    const handleChange = (e, newAlignment) => {
        console.log(newAlignment)
        setAlignment(newAlignment);
    }

    let content = "";

    if(alignment === 'player'){
        content = 
            <Box>
                This should be the youtube player
            </Box>
    } 
    if(alignment === 'comments'){
        content = 
            <Box>
                This should be the COMMENT section 
            </Box>
    }

    return (
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
    )

}