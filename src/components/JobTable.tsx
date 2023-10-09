import { useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PriorityLabel } from "./PriorityLabel";
import { useAppSelector } from "../app/hooks";
import { useForm } from "react-hook-form";
import { CustomSelect } from "./Custom/Select";

export function JobTable() {
  const { register, watch } = useForm({
    defaultValues: {
      name: "",
      priority: "ALL",
    },
  });
  const jobs = useAppSelector((s) => s.job.jobs);

  const priority = watch("priority");
  const jobNameForFilter = watch("name");

  const filtredJobs = useMemo(() => {
    const compareText = jobNameForFilter.trim().toLocaleLowerCase();
    return jobs.filter((j) => {
      const pRes = priority === "ALL" ? true : j.priority === priority;

      const text = j.name.toLocaleLowerCase();

      const tRes = compareText.length === 0 ? true : text.includes(compareText);

      return tRes && pRes;
    });
  }, [jobs, jobNameForFilter, priority]);

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          p: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth variant="standard">
            <TextField
              label="Job Name"
              variant="standard"
              {...register("name")}
            />
            <FormHelperText>
              Type your job description to filter table
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth variant="standard">
            <CustomSelect
              label="Job Priority"
              variant="standard"
              name="priority"
              value={priority}
              register={register("priority")}
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              <MenuItem value={"URGENT"}>Urgent</MenuItem>
              <MenuItem value={"REGULAR"}>Regular</MenuItem>
              <MenuItem value={"TRIVIAL"}>Trivial</MenuItem>
            </CustomSelect>
            <FormHelperText>
              Select job's priority to filter table
            </FormHelperText>
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
          {filtredJobs.map((row) => (
            <TableRow key={row.id}>
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
