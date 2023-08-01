import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";

export default function StadiumList () {

    const [rows, setRows] = useState([]);

    const columns: GridColDef[] = [
      { field: 'teamName', headerName: 'Team Name', flex: 1 },
      { field: 'teamId', headerName: 'Team ID', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      { field: 'date', headerName: 'Publish Date', flex: 1 },
]

    const getApiData = async () => {
      const response = await fetch(
        "https://stadiumwizardbackend.vercel.app/stadiums/"
      ).then((response) => response.json());
      
      setRows(response);
    };

    useEffect(() => {
      getApiData();
    }, []);

    return (
        <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        rowHeight={30}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
            />
    )
}
