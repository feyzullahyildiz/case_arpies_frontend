import { useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CreateJob } from "./components/CreateJob";
import { JobTable } from "./components/JobTable";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchDataAsync } from "./features/jobs/jobSlice";

export default function App() {
  const status = useAppSelector((s) => s.job.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "NEED_TO_FETCH_DATA") {
      dispatch(fetchDataAsync());
    }
  }, [dispatch, status]);

  const stateText = useMemo(() => {
    if (status === "failed" || status === "loading") {
      return status;
    }
    return "";
  }, [status]);
  return (
    <Container maxWidth="md">
      <Box mt={2} mb={2}>
        LOGO {stateText}
      </Box>
      <Divider />
      <Box sx={{ my: 4 }}>
        <Typography variant="h6">Create New Job</Typography>
        <CreateJob />
        <Box mt={2} mb={2}>
          <Typography variant="h6">Job List</Typography>
        </Box>
        <JobTable />
      </Box>
    </Container>
  );
}
