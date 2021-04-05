import React from 'react';
import HomeNavMenu from './HomeNavMenu';
import DualTextBlock from './DualTextBlock';
import mainTheme from "common/variables/theme";
import { ThemeProvider } from "@material-ui/styles";

const Home = ({
  }) => {

    return (
    <ThemeProvider theme={mainTheme}>
        <HomeNavMenu />
        <DualTextBlock />
        
    </ThemeProvider>
    );
    
  }

export default Home;