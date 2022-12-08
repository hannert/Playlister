import { useContext, useState } from 'react';
import AuthContext from '../auth';

import Copyright from './Copyright';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppBanner from './AppBanner';
import MUIErrorModal from './MUIErrorModal';
export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    const [remember, setRemember] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('remember:',remember)
        auth.loginUser(
            formData.get('email'),
            formData.get('password')
        );
        console.log("Hi")

    };

    function handleCheckbox(e) {
        setRemember(!remember);
    }

    return (
        <Box>
            <AppBanner />
        <Grid container component="main" sx={{ height: '100vh', display:'flex', justifyContent:'center' }}>
            

            <MUIErrorModal />
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box sx={{display:'flex', justifyContent:'center'}}>
                            <Box>
                                <Link href='/register/' variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
        </Grid>
        </Box>
    );
}