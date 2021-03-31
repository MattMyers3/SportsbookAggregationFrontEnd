import React from 'react';
import HomeNavMenu from './HomeNavMenu'
import mainTheme from "common/variables/theme";
import { ThemeProvider } from "@material-ui/styles";

const Home = ({
  }) => {

    return (
    <ThemeProvider theme={mainTheme}>
        <HomeNavMenu></HomeNavMenu>
    </ThemeProvider>
    );
    
  }

export default Home;