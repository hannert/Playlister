// This component will contain the Youtube player itself and the toolbar that goes with it.
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";

export default function YouTubeBox () {

    return(
        <Box>

            Youtube Player Component

            <Box>
                <Typography>
                    Playlist:
                </Typography>
                <Typography>
                    Song #:
                </Typography>
                <Typography>
                    Title:
                </Typography>
                <Typography>
                    Artist
                </Typography>
            </Box>
            <Box sx={{backgroundColor:'burlywood', display:'flex', justifyContent:'center'}}>
                <ButtonGroup variant="text">
                    <IconButton sx={{borderRadius:0}}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton sx={{borderRadius:0}}>
                        <StopIcon />
                    </IconButton>
                    <IconButton sx={{borderRadius:0}}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton sx={{borderRadius:0}}>
                        <SkipNextIcon />
                    </IconButton>
                </ButtonGroup>
            </Box>
        </Box>
    )
}