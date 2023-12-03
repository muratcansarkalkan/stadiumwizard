import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import connectionLink from '../connection/Connection';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  GridActionsCellItem,
  GridRowId,
} from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// Generated a state for login status here
import { useAuth } from '../context/LoginState';

export default function StadiumList () {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);

    // Definition of columns
    const columns: GridColDef[] = [
      { field: 'teamName', headerName: 'Team Name', flex: 1 },
      { field: 'teamId', headerName: 'Team ID', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      { field: 'date', headerName: 'Publish Date', flex: 1 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ]

    // Dialog attributes
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
      setOpen(false);
    };

    // Deletes rows by UI
    const handleDeleteClick = async (_id: GridRowId) => {
      try {
        const response = await fetch(`${connectionLink}/stadiums/IDspecific/delete/${_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
        }
        );  

      if (response.ok) {
        // If response is 200, update rows after successful deletion
        setRows(rows.filter((row) => row['_id'] !== _id));
      } else if (response.status === 401) {
        // If response is 401, show a popup indicating not logged in as admin
        setOpen(true);
        setMessage('Not logged in as admin');
      } else {
        // Handle other error scenarios if needed
        console.error('Unhandled error:', response.status);
      }
      }
      catch (error) {
        console.error('Error:', error)
      }
    };

    // Gets data from stadiums. no login required
    const getApiData = async () => {
      setLoading(true)
      const response = await fetch(
        `${connectionLink}/stadiums/`
      ).then((response) => response.json());
      
      setRows(response);
      setLoading(false)
    };

    // execution at initial state, we have useEffect.
    useEffect(() => {
      getApiData();
    }, []);

    return (
      <div>
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
        columnVisibilityModel={{
          // Hide action column if user didn't log in
          actions: isLoggedIn,
        }}      
        />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
}
