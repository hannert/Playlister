import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalStoreContext } from '../store/index.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    // store.history = useHistory();
    const location = useLocation();
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    useEffect(() => {
        console.log('!',id)
        store.setCurrentList(id);
    }, [])

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    return (
        <Box>
            Workspace Screen
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {
                store.currentList?.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;