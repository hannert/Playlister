// This component will contain the Youtube player itself and the toolbar that goes with it.
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import { Box, ButtonGroup, Grid, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { GlobalStoreContext } from '../store';

export default function YouTubeBox () {

    const { store } = useContext(GlobalStoreContext);
    const [_playing, setPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState('')   
    const [currentList, setCurrentList] = useState(['i7ouv9AyB_o']) // Get a copy of the opened playlist
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    useEffect(() => {
        console.log(store?.currentPlayingSong)
        if(store?.currentPlayingSong !== null) {
            console.log('currplasong not null')
            setCurrentList(store?.currentList?.songs)
            setCurrentSongIndex(store.getCurrentSongIndex()) // Index of current song playing of the playlist 0-based
            setCurrentSong(store.currentPlayingSong?.youTubeId)            
        }

        
    }, [store?.currentPlayingSongIndex, store?.currentPlayingSong])


    function handlePause() {
        setPlaying(false)
    }
    function handlePlay() {
        setPlaying(true)
    }
    function handleSkip() {
        console.log("Skipped from " + currentSongIndex)
        let newSongIndex = (currentSongIndex + 1) % currentList.length
        setCurrentSongIndex(newSongIndex)
        setCurrentSong(currentList[newSongIndex].youTubeId)
        console.log(currentList, newSongIndex)
        store.setCurrentPlayingSong(currentList[newSongIndex], newSongIndex)
    }


    return(

        <Box sx={{height:'100%'}}>
            <ReactPlayer 
            url={"https://www.youtube.com/watch?v=" + currentSong} 
            width='100%'
            playing={_playing}
            key={currentSongIndex}
            onEnded={handleSkip}
            
            />
            <Box id='bottom-half' sx={{display:'flex', height:'100%', marginTop:'auto'}}>
                <Box sx={{alignSelf:'flex-end', width:'100%', p:1}}>
                    {
                    currentSong
                    ?<Box sx={{width:'100%'}}>
                        <Grid container sx={{font:'Roboto'}}>
                            <Grid item xs={12} sx={{display:'flex', justifyContent:'center'}}>
                                Now Playing
                            </Grid>
                            <Grid item xs={2}>
                                <Typography> Playlist: </Typography>
                                <Typography> Song #: </Typography>
                                <Typography> Title: </Typography>
                                <Typography> Artist: </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography>{store?.currentList?.name}</Typography>
                                <Typography>{store.currentPlayingSongIndex + 1}</Typography>
                                <Typography>{store.currentPlayingSong?.title}</Typography>
                                <Typography>{store.currentPlayingSong?.artist}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    : <Box> </Box>
                    }
                    
                    <Box sx={{backgroundColor:'burlywood', display:'flex', justifyContent:'center', width:'100%'}}>
                        <ButtonGroup variant="text">
                            <IconButton sx={{borderRadius:0}}>
                                <SkipPreviousIcon />
                            </IconButton>
                            <IconButton sx={{borderRadius:0}} onClick={handlePause}>
                                <StopIcon />
                            </IconButton>
                            <IconButton sx={{borderRadius:0}} onClick={handlePlay}>
                                <PlayArrowIcon />
                            </IconButton>
                            <IconButton sx={{borderRadius:0}} onClick={handleSkip}>
                                <SkipNextIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Box>
                </Box>
            </Box>
        </Box>        
    )
}