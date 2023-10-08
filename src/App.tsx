import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { CreateJob } from './components/CreateJob';
import { JobTable } from './components/JobTable';

export default function App() {
  return (
    <Container maxWidth="md">
      <Box mt={2} mb={2}>
        LOGO
      </Box>
      <Divider />
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" >
          Create New Job
        </Typography>
        <CreateJob />
        <Box mt={2} mb={2}>
          <Typography variant="h6">
            Job List
          </Typography>
        </Box>
        <JobTable />
      </Box>
    </Container>
  );
}
