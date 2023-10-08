import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

import Select, { SelectChangeEvent } from '@mui/material/Select';
export const CreateJob = () => {
    const [priority, setPriority] = React.useState<string | undefined>(undefined);

    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value);
    };
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
        >
            <Box sx={{ flex: 1 }}>
                <FormControl fullWidth variant="standard">
                    <TextField id="outlined-basic" label="Job Name" variant="standard" />
                    <FormHelperText>Type your job description</FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{ flexShrink: 0, minWidth: 140 }}>
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="demo-simple-select-label">Job Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        label="Job Priority"
                        variant="standard"
                        onChange={handleChange}

                    >
                        <MenuItem value={"Urgent"}>Urgent</MenuItem>
                        <MenuItem value={"Regular"}>Regular</MenuItem>
                        <MenuItem value={"Trivial"}>Trivial</MenuItem>
                    </Select>
                    <FormHelperText>Select job's priority</FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
                <Button title='Create' variant='contained' >Create</Button>
            </Box>


        </Box>
    )
}
