import React, { useState } from 'react';
import { Typography, Box, Card, Divider, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const SettingsPage = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleThemeChange = (event) => setTheme(event.target.value);
  const handleNotificationsChange = (event) => setNotifications(event.target.checked);
  const handleLanguageChange = (event) => setLanguage(event.target.value);
  const handleSaveChanges = () => {
    // Save settings logic here
    alert('Settings saved!');
  };

  return (
    <PageContainer title="Settings" description="Admin panel settings page">
      <DashboardCard title="Settings">
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Theme
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={theme}
                  onChange={handleThemeChange}
                  label="Theme"
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <label>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={handleNotificationsChange}
                  />
                  Enable Notifications
                </label>
              </FormControl>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Language
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  label="Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Password
              </Typography>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
              />
            </Card>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SettingsPage;
