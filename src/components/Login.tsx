import * as React from 'react';
import { useEffect, useState } from "react";
import {Button, Stack, TextField} from '@mui/material';
import connectionLink from '../connection/Connection';
import { useAuth } from '../context/LoginState';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router

export default function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { setLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Dialog attributes
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
      setOpen(false);
    };

    // Login function
    const handleLogin = async () => {
        try {
        const response = await fetch(`${connectionLink}/auth/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Include cookies in the request
        });
    
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); // Store token in local storage
          // Continue with the application logic or redirect to authenticated pages
          setLoggedIn(true);
          // Redirect to the home page ('/')
          navigate("/");
        } else {
          setOpen(true);
          setMessage('Username or password is wrong. Contact site admin.');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };
        
    return (
      <div>
      <p id="zero-state">
        Login if you have authorization granted by site admin.
      </p>
      <Stack direction="row" spacing={2}
      >
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            }}
          />
          <Button
            onClick={() => {
              handleLogin()
            }}        
          variant="contained">Submit</Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>

    );
  }