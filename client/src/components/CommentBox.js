import { Box, TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

export default function CommentBox() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            console.log("Pressed enter to add comment")
            store.commentOnPlayingPlaylist(text)
            setText('')
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let comments = "";

    if(store?.currentPlayingList?.comments){
        comments = 
        <Box sx={{display:'flex', flexDirection:'column', gap:'10px', height:'100%', overflow:'auto', p:2}}>
            {
            store.currentPlayingList.comments.map((comment) => (
                <Box sx={{
                    borderRadius:2, 
                    backgroundColor:'#D4AF37', 
                    width:'100%', 
                    boxSizing:'border-box', 
                    p:2
                    }}>
                    <Typography variant='subtitle2' sx={{color:'blueviolet'}} display='inline'>{comment.userName}</Typography>
                    <Typography variant='h6'>{comment.message}</Typography>
                </Box>
            ))
            
            
            }

        </Box>
        
    }

    return(
        <Box sx={{
            height:'92.5%', 
            backgroundColor:'#D4D4F5', 
            display:'flex', 
            flexDirection:'column',
            borderRadius: 2
            }}>
            <Typography variant="overline">Comments for {store?.currentPlayingList?.name}</Typography>
            <Box id='comment-container' sx={{height:'87.5%'}}>
                {comments}
            </Box>
            <Box sx={{p:1}}>
                <TextField
                label="Add Comment"
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                value={text}
                fullWidth
                disabled={store?.currentPlayingList == null}
                >

                </TextField>
            </Box>

        </Box>
    )
}