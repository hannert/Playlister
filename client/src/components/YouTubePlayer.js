
import { Button } from '@mui/material';
import { useState } from 'react';
import ReactPlayer from 'react-player';

export default function YouTubePlayer (props) {

    const [_playing, setPlaying] = useState(false)
    const [playlist, setPlaylist] = useState(['i7ouv9AyB_o'])

    
    let song = 'i7ouv9AyB_o';

    if(props!==null){
        console.log(props.song)
        song = props.song;
    }

    function handlePause() {
        console.log("Playing")
        setPlaying(false)
    }
    function handlePlay() {
        setPlaying(true)
    }
    return(
        <div>
            <ReactPlayer 
            url={"https://www.youtube.com/watch?v=" + song} 
            width='100%'
            playing={_playing}
            
            />
            <Button onClick={handlePlay}>
                Play?
            </Button>
            <Button onClick={handlePause}>
                Hello.
            </Button>
        </div>

    )
}