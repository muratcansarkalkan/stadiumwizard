import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import StadiumDetail from './StadiumDetail';
import connectionLink from '../connection/Connection';

// Defining columns

const columns: GridColDef[] = [
    { field: 'Country', headerName: 'Country', flex: 1 },
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'FIFAManagerID', headerName: 'FIFAM Id', flex: 1 },
    { field: 'League', headerName: 'League', flex: 1 },
    { field: 'City', headerName: 'City', flex: 1 },
    { field: 'LeagueLevel', headerName: 'Stadium Availability', flex: 1,
    renderCell: params => {
        if (params.row.stadiumData.length > 0) {
          return <StadiumDetail title='Available' data={params.row.stadiumData[0]} />;
        }
        return <div>Not Available</div>;
   }
},
]


export default function TeamList () {

    // Changing datatable
    const [rows, setRows] = useState([]);

    // Get data!
    const getApiData = async (selectedCountry: string, selectedLeague: string) => {
        setLoading(true);
        const response = await fetch(
            `${connectionLink}/teams/stadiumdata/country=${selectedCountry}&league=${selectedLeague}`
        ).then((response) => response.json());
        setRows(response);
        setLoading(false);
      };

    // Change selection 
    const [country, setCountry] = React.useState('');
    const [countries, setCountries] = React.useState<any[]>([]);

    const [league, setLeague] = React.useState('');
    const [leagues, setLeagues] = React.useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const getLeagues = async (selectedCountry: string) => {
        const response = await fetch(
          `${connectionLink}/leagues/country=${selectedCountry}`
        ).then((response) => response.json());
        setLeagues(response);
      };

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        const response = await fetch(
            `${connectionLink}/leagues/countries`
        ).then((response) => response.json());
        setCountries(response);
    };

    // gets a list of teams
    const handleCountryChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
        setRows([]);
        setLeague('');
        getLeagues(event.target.value);
    };

    const handleLeagueChange = (event: SelectChangeEvent) => {
        setLeague(event.target.value as string);
        getApiData(country, event.target.value);
    };
    
    return (
    <Box>
      <FormControl
        sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleCountryChange}
        >
            {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 320 }}>
        <InputLabel id="demo-simple-select-label">League</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={league}
          label="League"
          onChange={handleLeagueChange}
        >
            {leagues.map((league) => (
            <MenuItem key={league._id} value={league.League}>
              {league.League}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DataGrid sx={{ minHeight: 200 }}
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        loading={loading}
        rowHeight={30}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        />
    </Box>

    )
}
