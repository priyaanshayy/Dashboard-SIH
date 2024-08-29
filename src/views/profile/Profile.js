import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Divider, Grid, TextField, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig'; // Adjust the path to your firebase config
import ProfileImg from 'src/assets/images/profile/user-1.jpg'; // Replace with your profile image

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    uid: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error('No user is currently logged in.');
        }

        const adminDocRef = doc(db, 'admins', user.uid); // Fetch the admin document using UID
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          setAdminData(adminDoc.data());
        } else {
          console.error('Admin document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No user is currently logged in.');
      }

      const adminDocRef = doc(db, 'admins', user.uid);
      await updateDoc(adminDocRef, adminData); // Update the admin document with new data

      console.log('Admin data updated successfully.');

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

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
                {adminData.name}
              </Typography>
              <Typography color="text.secondary">{adminData.email}</Typography>
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
                name="name"
                variant="outlined"
                value={adminData.name}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Email Address"
                name="email"
                variant="outlined"
                value={adminData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: theme.spacing(2) }}
                onClick={handleSaveChanges}
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
