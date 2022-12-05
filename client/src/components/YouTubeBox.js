// This component will contain the Youtube player itself and the toolbar that goes with it.
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { GlobalStoreContext } from '../store';


export default function YouTubeBox () {

    const { store } = useContext(GlobalStoreContext);
    const [_playing, setPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState('i7ouv9AyB_o')   
    const [currentList, setCurrentList] = useState(['i7ouv9AyB_o']) // Get a copy of the opened playlist
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    useEffect(() => {
        console.log(store?.currentPlayingSong)
        
        if(store.currentList !== null){
            let x = store.currentList?.songs.map((song, index)=> [(index + 1), song._id, song.youTubeId])
            console.log('----------------')
            console.log(x)
            setCurrentList(x)
            let y = store.currentList?.songs.map((songs) => songs._id)
            console.log(y)
            console.log("Song number " + (y.indexOf(store.currentPlayingSong?._id) + 1))
            setCurrentSongIndex(y.indexOf(store.currentPlayingSong?._id)) // Index of current song playing of the playlist 0-based
        }
        console.log(store.currentPlayingSong)

        setCurrentSong(store.currentPlayingSong?.youTubeId)
        
    }, [store?.currentPlayingSong])


    function handlePause() {
        setPlaying(false)
    }
    function handlePlay() {
        setPlaying(true)
    }
    function handleSkip() {
        console.log("Skipped from " + currentSongIndex)
        let newSongIndex = currentSongIndex + 1
        setCurrentSongIndex(currentSongIndex+1)
        console.log("Handle skip")
        console.log(currentList)
        console.log(currentList[newSongIndex][2])
        setCurrentSong(currentList[newSongIndex][2])
    }

    return(
        <Box>

            Youtube Player Component
            <ReactPlayer 
            url={"https://www.youtube.com/watch?v=" + currentSong} 
            width='100%'
            playing={_playing}
            
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
    )
}