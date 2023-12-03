import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, Outlet } from "react-router-dom";
import AppBar from '../drawer/AppBar';
import MainSection from '../drawer/MainSection';

import connectionLink from '../connection/Connection';
import { useAuth } from '../context/LoginState';

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

export default function Sidebar() {
  const { isLoggedIn, setLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${connectionLink}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Ensure to include credentials if using cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful logout
        setLoggedIn(false);
        console.log('Logged out successfully');
        // Redirect the user or perform other actions after successful logout
      } else {
        console.error('Logout failed');
        // Handle logout failure
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error
    }
  }

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
              key={2}
              component={NavLink} to={'teamList'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Team List
            </Button>
            <Button
              key={2}
              component={NavLink} to={'leagueList'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              League List
            </Button>
          </Box>
          {!isLoggedIn && <Button
              key={3}
              component={NavLink} to={'login'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Login
          </Button>}
          {isLoggedIn && <Button
              key={3}
              onClick={() => handleLogout()}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
          </Button>
          }
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
