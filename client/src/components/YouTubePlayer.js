import { useState } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer (props) {
    const [opts, setOpts] = useState(
        {width:'100%', 
        playerVars: {
            'autoplay': 1,
            origin: "http://www.youtube.com"
        }
    });

    
    let song = 'vL3r-xF6bAQ';

    if(props) song = props.song

    return(
        <YouTube videoId={song} opts={opts}/>
    )
}