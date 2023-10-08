import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
// import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PriorityLabel } from './PriorityLabel';
import { useAppSelector } from '../app/hooks';

export function JobTable() {

  const jobs = useAppSelector(s => s.job.jobs)
  const [priority, setPriority] = React.useState<string | undefined>("ALL");

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', p: 2 }}>
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth variant="standard">
            <TextField id="outlined-basic" label="Job Name" variant="standard" />
            <FormHelperText>Type your job description to filter table</FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 180 }}>
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
              <MenuItem value={"ALL"}>ALL</MenuItem>
              <MenuItem value={"URGENT"}>Urgent</MenuItem>
              <MenuItem value={"REGULAR"}>Regular</MenuItem>
              <MenuItem value={"TRIVIAL"}>Trivial</MenuItem>
            </Select>
            <FormHelperText>Select job's priority to filter table</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Table sx={{ minWidth: 420 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((row) => (
            <TableRow
              key={row.id}
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <PriorityLabel type={row.priority} />
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}