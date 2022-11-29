import { Button, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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

        <Box id="splash-screen">
            <Grid 
                container
                spacing={2}
                sx={{height:'100%'}}
                >
                <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
                    <Item>
                        <Typography>
                            Playlister
                        </Typography>
                        <img src='playlisterlogo.png'/>
                    </Item>
                    
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Welcome to Playlister something something 
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid 
                        container 
                        spacing={3}
                        alignContent="center"
                        >
                        <Grid item xs={6}>
                            <Item sx={{textAlign:'right'}}>
                                <Button component={Link} to='/login/' variant="contained" style={{width:'120px', height:'60px'}}> 
                                Login
                                </Button>
                            </Item>
                            
                        </Grid>
                        <Grid item xs={6}>
                            <Item sx={{textAlign:'left'}}>
                                <Button component={Link} to='/register/' variant="contained" style={{width:'120px', height:'60px'}}>
                                    Create Account
                                </Button>
                            </Item>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <Button variant="contained" style={{width:'120px', height:'60px'}}>
                                    Continue as Guest
                                </Button>
                            </Item>
                            
                        </Grid>
                    </Grid>
                </Grid>

                
            </Grid>
        </Box>
    )
}