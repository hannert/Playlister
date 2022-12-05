// This component will contain the Youtube player itself and the toolbar that goes with it.
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';
import YouTubePlayer from './YouTubePlayer';


export default function YouTubeBox () {

    const { store } = useContext(GlobalStoreContext);

    const [currentSong, setCurrentSong] = useState(null)
    useEffect(() => {
        console.log(store?.currentPlayingSong)
        setCurrentSong(store.currentPlayingSong?._id)
    }, [store?.currentPlayingSong])

    return(
        <Box>

            Youtube Player Component
            <YouTubePlayer 
                song={currentSong}
            />
            <Box>
                <Typography>
                    Playlist: {store?.currentList?.name}
                </Typography>
                <Typography>
                    Song #: {store.currentPlayingSong?._id}
                </Typography>
                <Typography>
                    Title: {store.currentPlayingSong?.title}
                </Typography>
                <Typography>
                    Artist {store.currentPlayingSong?.artist}
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