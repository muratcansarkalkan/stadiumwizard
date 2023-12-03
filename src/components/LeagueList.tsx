import { DataGrid, GridToolbar, GridColDef, GridActionsCellItem, GridRowId} from '@mui/x-data-grid';
import connectionLink from '../connection/Connection';
import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, Grid, SpeedDial, SpeedDialIcon, Stack, TextField} from '@mui/material';
import SimpleSnackbar from './Snackbar';
import { useAuth } from '../context/LoginState';

export default function LeagueList() {
  const { isLoggedIn, setLoggedIn } = useAuth();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  const columns: GridColDef[] = [
    { field: 'Country', headerName: 'Country', flex: 0.5 },
    { field: 'League', headerName: 'League', flex: 1.5 },
  ]

    // Gets data from stadiums. no login required
    const getApiData = async () => {
      setLoading(true)
      const response = await fetch(
        `${connectionLink}/leagues/`
      ).then((response) => response.json());
      
      setRows(response);
      setLoading(false)
    };

    // execution at initial state, we have useEffect.
    useEffect(() => {
      getApiData();
    }, []);
  
    const [country, setCountry] = useState('');
    const [league, setLeague] = useState('');  
    const [response, setResponse] = useState<any>(null);

    const handleClose = () => {
      setOpen(false);
      setCountry('');
      setLeague('');
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const addLeagues = async () => {
  
      try {
        const apiUrl = `${connectionLink}/leagues/new`; // Replace with your API endpoint
        const requestBody = {
          Country: country,
          League: league,
        };
  
        const result = await axios.post(apiUrl, requestBody, { withCredentials: true });
        setResponse(result.data.message);
        setSnackOpen(true);
        getApiData();
      } catch (error) {
        console.error('Error creating league:', error);
      }
    };

    // for snackbar after successful league creation

    const [snackOpen, setSnackOpen] = React.useState(false);

    const snackHandleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnackOpen(false);
    };  
  
    return (
      <Box>
        <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center">
          <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          loading={loading}
          columns={columns}
          rowHeight={30}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          />
        </Grid>  
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
        {isLoggedIn && <SpeedDial
          onClick={handleOpen}
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
        </SpeedDial>
        }
      </Box>
      <Dialog 
        sx={{ '& .MuiDialog-paper': { width: '40%'} }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Add a new league</DialogTitle>
          <DialogContent>
          <Stack spacing={2}>
              <TextField
                  required
                  autoFocus
                  id="standard-required"
                  label="Country"
                  defaultValue="Hello World"
                  variant="standard"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              <TextField
                required
                id="standard-required"
                label="League"
                defaultValue="Hello World"
                variant="standard"
                value={league}
                onChange={(e) => setLeague(e.target.value)}    
              />
            </Stack>
          </DialogContent>
          <DialogActions>
          <Button onClick={addLeagues}>Add</Button>
          </DialogActions>
      </Dialog>
      <SimpleSnackbar snackOpen={snackOpen} snackHandleClose={snackHandleClose} message={response}/>
      </Box>
    );
  }
  