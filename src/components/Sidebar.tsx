import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, Outlet } from "react-router-dom";
import AppBar from '../drawer/AppBar';
import MainSection from '../drawer/MainSection';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface PaletteOptions {
    palette?:  {
      mode?: string,
      primary?: {
        main?: string,
      },
      secondary?: {
        main?: string,
      },
      background?: {
        default?: string,
        paper?: string,
      },
      text?: {
        primary?: string,
        secondary?: string,
        disabled?: string,
      },
      info?: {
        main?: string,
      },
    }, 
  }
  interface TypographyOptions {
    typography: {
      fontFamily?: string,
    },  
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f79018',
    },
    secondary: {
      main: '#a4b4ef',
    },
    background: {
      default: '#212458',
      paper: '#212458',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.6)',
      disabled: 'rgba(255,255,255,0.38)',
    },
    info: {
      main: '#2955f6',
    },
  },
  typography: {
    fontFamily: 'PT Sans',
  },
});

// <ThemeProvider theme={theme}></ThemeProvider>

export default function Sidebar() {

  return (
    <Box>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component={NavLink} 
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                      to={'/'}
          >
            Stadium Wizard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={1}
              component={NavLink} to={'stadiumList'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Stadium List
            </Button>
            <Button
              key={1}
              component={NavLink} to={'teamList'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Team List
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <MainSection>
        <Outlet/>
      </MainSection>
    </Box>
    </Box>
  );
}
