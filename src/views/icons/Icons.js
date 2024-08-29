import React from 'react';
import { Typography, Box, Card, Grid, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const HelpAndSupport = () => {
  return (
    <PageContainer title="Help and Support" description="Help and support page">
      <DashboardCard title="Help and Support">
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you need assistance or have any questions, please fill out the form below. Our support team will get back to you as soon as possible.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contact Form
              </Typography>
              <form>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Frequently Asked Questions
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Q: How can I reset my password?</strong>
                <br />
                A: You can reset your password by clicking on the 'Forgot Password' link on the login page.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Q: How do I update my profile information?</strong>
                <br />
                A: You can update your profile information in the 'Profile' section of the dashboard.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Q: Where can I find more documentation?</strong>
                <br />
                A: Documentation can be found in the 'Documentation' section of the dashboard or on our website.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default HelpAndSupport;
