import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Button,
  Paper,
} from '@mui/material';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  eligibility: {
    department: string;
    cgpa: number;
  };
}

interface Application {
  id: string;
  jobId: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'selected';
  company: string;
  position: string;
  appliedDate: string;
}

const StudentDashboard = () => {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // TODO: Fetch actual data from API
    // Mock data for demonstration
    setRecentJobs([
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'Bangalore',
        type: 'Full-time',
        eligibility: {
          department: 'Computer Science',
          cgpa: 7.5,
        },
      },
      {
        id: '2',
        title: 'Data Analyst',
        company: 'Analytics Ltd',
        location: 'Mumbai',
        type: 'Full-time',
        eligibility: {
          department: 'Any',
          cgpa: 7.0,
        },
      },
    ]);

    setApplications([
      {
        id: '1',
        jobId: '1',
        status: 'shortlisted',
        company: 'Tech Corp',
        position: 'Software Engineer',
        appliedDate: '2024-01-15',
      },
      {
        id: '2',
        jobId: '2',
        status: 'pending',
        company: 'Analytics Ltd',
        position: 'Data Analyst',
        appliedDate: '2024-01-20',
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'primary';
      case 'selected':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Recent Jobs Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Job Postings
            </Typography>
            {recentJobs.map((job) => (
              <Card key={job.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {job.company} - {job.location}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={`CGPA: ${job.eligibility.cgpa}+`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={job.eligibility.department}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip label={job.type} size="small" />
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => console.log('Apply clicked', job.id)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Applications Status Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              My Applications
            </Typography>
            {applications.map((application) => (
              <Card key={application.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{application.position}</Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {application.company}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Applied on: {application.appliedDate}
                  </Typography>
                  <Chip
                    label={application.status.toUpperCase()}
                    color={getStatusColor(application.status)}
                    size="small"
                  />
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;