import { Button, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import { Link } from 'react-router-dom';
import { LogoCopy } from "./LogoCopy";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleLoginPress = () => {

  }

  const handleRegisterPress = () => {

  }

  const handleGuestPress = () => {

  }
  
export default function SplashScreen() {
    return (

        <Box id="splash-screen" sx={{height:'100%'}}>
            <Grid 
                container
                spacing={2}
                sx={{height:'100%'}}
                >
                <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
                    <Box sx={{width:'50%'}}>
                        <LogoCopy/>
                    </Box>
                    
                    
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4'>
                        Welcome to Playlister!
                    </Typography>
                    <Typography variant='h6'>
                        A site where you can create playlists and share them with others!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid 
                        container 
                        spacing={3}
                        alignContent="center"
                        >
                        <Grid item xs={6}>
                            <Box sx={{textAlign:'right'}}>
                                <Button component={Link} to='/login/' variant="contained" style={{width:'120px', height:'60px'}}> 
                                Login
                                </Button>
                            </Box>
                            
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{textAlign:'left'}}>
                                <Button component={Link} to='/register/' variant="contained" style={{width:'120px', height:'60px'}}>
                                    Create Account
                                </Button>
                            </Box>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Button variant="contained" style={{width:'120px', height:'60px'}}>
                                    Continue as Guest
                                </Button>
                            </Box>
                            
                        </Grid>
                    </Grid>
                </Grid>

                
            </Grid>
        </Box>
    )
}