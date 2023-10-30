import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import connectionLink from '../connection/Connection';

export default function StadiumList () {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns: GridColDef[] = [
      { field: 'teamName', headerName: 'Team Name', flex: 1 },
      { field: 'teamId', headerName: 'Team ID', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      { field: 'date', headerName: 'Publish Date', flex: 1 },
]

    const getApiData = async () => {
      setLoading(true)
      const response = await fetch(
        `${connectionLink}/stadiums/`
      ).then((response) => response.json());
      
      setRows(response);
      setLoading(false)
    };

    useEffect(() => {
      getApiData();
    }, []);

    return (
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
    )
}
