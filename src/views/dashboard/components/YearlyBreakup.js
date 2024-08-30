import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '../../../components/shared/DashboardCard';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebaseConfig'; 

const YearlyBreakup = () => {
  const [alumniCount, setAlumniCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [color, setColor] = useState('#1976d2'); // Default color

  const theme = useTheme();
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // Example previous year total value
  const previousTotal = 3000;

  // Chart options
  const options = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 250,
    },
    colors: [color, primarylight], // Use fetched color here
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: '100%',
          },
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const allUsers = usersSnapshot.docs.map(doc => doc.data());

        // Count alumni and students
        const alumni = allUsers.filter(user => user.whoami === 'Alumni').length;
        const students = allUsers.filter(user => user.whoami === 'Student').length;

        setAlumniCount(alumni);
        setStudentCount(students);

        // Fetch color setting from Firestore
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setColor(userData.color || '#1976d2'); // Default color if not set
          } else {
            console.error("No such document!");
          }
        } else {
          console.error("No authenticated user found!");
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const currentTotal = alumniCount + studentCount;

  const series = [alumniCount, studentCount];

  return (
    <DashboardCard title="Alumni and Students Overview">
      <Grid container spacing={3}>
        {/* Chart for Alumni and Students */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Chart
            options={{
              ...options,
              labels: ['Alumni', 'Students'],
            }}
            series={series}
            type="donut"
            height="250"
          />
        </Grid>
        {/* Statistics */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography variant="h4" fontWeight="700">
            {currentTotal}
          </Typography>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: color, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Alumni
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Students
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
