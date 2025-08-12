import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  cgpa: number;
  status: 'pending' | 'approved' | 'rejected';
  applicants: number;
  postedDate: string;
}

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    // TODO: Fetch actual data from API
    setJobPostings([
      {
        id: '1',
        title: 'Software Engineer',
        department: 'Computer Science',
        cgpa: 7.5,
        status: 'approved',
        applicants: 15,
        postedDate: '2024-01-15',
      },
      {
        id: '2',
        title: 'Data Analyst',
        department: 'Any',
        cgpa: 7.0,
        status: 'pending',
        applicants: 8,
        postedDate: '2024-01-20',
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Job Postings</Typography>
                <Typography variant="h4">{jobPostings.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Applicants</Typography>
                <Typography variant="h4">
                  {jobPostings.reduce((sum, job) => sum + job.applicants, 0)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Pending Approvals</Typography>
                <Typography variant="h4">
                  {jobPostings.filter((job) => job.status === 'pending').length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Job Postings List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">My Job Postings</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/recruiter/post-job')}
              >
                Post New Job
              </Button>
            </Box>
            {jobPostings.map((job) => (
              <Card key={job.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{job.title}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Typography color="textSecondary" gutterBottom>
                    Posted on: {job.postedDate}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={`CGPA: ${job.cgpa}+`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip label={job.department} size="small" sx={{ mr: 1 }} />
                    <Chip
                      label={job.status.toUpperCase()}
                      color={getStatusColor(job.status)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${job.applicants} Applicants`}
                      size="small"
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      navigate(`/recruiter/applications/${job.id}`)
                    }
                  >
                    View Applications
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecruiterDashboard;