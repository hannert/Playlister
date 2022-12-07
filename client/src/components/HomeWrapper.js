import { Box } from '@mui/material'
import { useContext } from 'react'
import AuthContext from '../auth'
import AppBanner from './AppBanner'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return(
         <Box sx={{height:'100%'}}>
            <AppBanner />
            <HomeScreen />
        </Box>
        )
    else
        return <SplashScreen />
}