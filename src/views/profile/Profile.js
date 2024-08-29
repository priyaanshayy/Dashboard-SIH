import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Divider, Grid, TextField, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProfileImg from 'src/assets/images/profile/user-1.jpg'; // Replace with your profile image

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSaveChanges = () => {
    // Add your save logic here if needed

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        padding: theme.spacing(3),
      }}
    >
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      
      <Paper
        sx={{
          padding: theme.spacing(3),
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar
                src={ProfileImg}
                alt="Profile Image"
                sx={{
                  width: 100,
                  height: 100,
                  border: `5px solid ${theme.palette.primary.main}`,
                }}
              />
              <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                John Doe
              </Typography>
              <Typography color="text.secondary">john.doe@example.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Divider sx={{ marginBottom: theme.spacing(2) }} />
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(2),
              }}
            >
              <TextField
                label="Full Name"
                variant="outlined"
                defaultValue="John Doe"
                fullWidth
              />
              <TextField
                label="Email Address"
                variant="outlined"
                defaultValue="john.doe@example.com"
                fullWidth
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                defaultValue="+1234567890"
                fullWidth
              />
              <TextField
                label="Address"
                variant="outlined"
                defaultValue="123 Main St, City, Country"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: theme.spacing(2) }}
                onClick={handleSaveChanges} // Add onClick handler
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
