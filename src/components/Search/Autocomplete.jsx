import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


const SearchWithFields = ({setInputData, inputData, param, placeholder, options}) => {
    return (
        <Stack spacing={2} sx={{ width: 500 }}>
        <Autocomplete 
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            value={inputData.location}
            options={options}
            onChange={(event, newValue) => {
                setInputData({...inputData, [param]: newValue});
              }}
            renderInput={(params) => (
            <TextField
                {...params}
                label={placeholder}
                InputProps={{
                ...params.InputProps,
                type: 'search',
                }}
            />
            )}
        />
        </Stack>
    );
}



export default SearchWithFields