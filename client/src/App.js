import { createTheme, ThemeProvider } from '@mui/material';
import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './auth';
import {
    HomeWrapper,
    LoginScreen,
    RegisterScreen
} from './components';
import { GlobalStoreContextProvider } from './store';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const THEME = createTheme({
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    }
})


const App = () => {   
    return (
        <ThemeProvider theme={THEME}>
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>        
                    {/* <AppBanner /> */}
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
        </ThemeProvider>
    )
}

export default App