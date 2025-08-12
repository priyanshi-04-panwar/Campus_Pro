import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

interface JobApproval {
  id: string;
  title: string;
  company: string;
  department: string;
  cgpa: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

interface Analytics {
  totalStudents: number;
  totalRecruiters: number;
  totalJobs: number;
  totalPlacements: number;
  departmentStats: {
    name: string;
    placementPercentage: number;
  }[];
  recentActivities: {
    id: string;
    activity: string;
    timestamp: string;
  }[];
}

const AdminDashboard = () => {
  const [jobApprovals, setJobApprovals] = useState<JobApproval[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    // TODO: Fetch actual data from API
    setJobApprovals([
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        department: 'Computer Science',
        cgpa: 7.5,
        status: 'pending',
        submittedDate: '2024-01-15',
      },
      {
        id: '2',
        title: 'Data Analyst',
        company: 'Analytics Ltd',
        department: 'Any',
        cgpa: 7.0,
        status: 'pending',
        submittedDate: '2024-01-20',
      },
    ]);

    setAnalytics({
      totalStudents: 500,
      totalRecruiters: 25,
      totalJobs: 45,
      totalPlacements: 120,
      departmentStats: [
        { name: 'Computer Science', placementPercentage: 85 },
        { name: 'Electronics', placementPercentage: 75 },
        { name: 'Mechanical', placementPercentage: 70 },
      ],
      recentActivities: [
        {
          id: '1',
          activity: 'New job posted by Tech Corp',
          timestamp: '2024-01-20 14:30',
        },
        {
          id: '2',
          activity: '15 students applied for Software Engineer position',
          timestamp: '2024-01-19 16:45',
        },
      ],
    });
  }, []);

  const handleApproval = (jobId: string, status: 'approved' | 'rejected') => {
    // TODO: Implement actual API call
    setJobApprovals((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status } : job
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h4">{analytics?.totalStudents}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Recruiters</Typography>
                <Typography variant="h4">{analytics?.totalRecruiters}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Jobs</Typography>
                <Typography variant="h4">{analytics?.totalJobs}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Placements</Typography>
                <Typography variant="h4">{analytics?.totalPlacements}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Department Stats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Department-wise Placement Statistics
            </Typography>
            {analytics?.departmentStats.map((dept) => (
              <Box key={dept.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{dept.name}</Typography>
                  <Typography variant="body2">{dept.placementPercentage}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={dept.placementPercentage}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Timeline>
              {analytics?.recentActivities.map((activity) => (
                <TimelineItem key={activity.id}>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body1">{activity.activity}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {activity.timestamp}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>

        {/* Job Approvals */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pending Job Approvals
            </Typography>
            {jobApprovals.map((job) => (
              <Card key={job.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {job.company}
                  </Typography>
                  <Box sx={{ mt: 1, mb: 2 }}>
                    <Chip
                      label={`CGPA: ${job.cgpa}+`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip label={job.department} size="small" sx={{ mr: 1 }} />
                    <Chip
                      label={`Submitted: ${job.submittedDate}`}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleApproval(job.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleApproval(job.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;