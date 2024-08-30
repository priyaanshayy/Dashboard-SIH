// ProductPerformance.js
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase/firebaseConfig'; 
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const ProductPerformance = () => {
  const [adminName, setAdminName] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error('No user is currently logged in.');
        }

        // Fetch admin data
        const adminDocRef = doc(db, 'admins', user.uid); // Use UID to fetch admin document
        const adminDoc = await getDoc(adminDocRef);

        if (!adminDoc.exists()) {
          throw new Error('Admin document does not exist.');
        }

        const adminData = adminDoc.data();
        setAdminName(adminData.name.toLowerCase());

        // Fetch users data
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const allUsers = usersSnapshot.docs.map(doc => doc.data());

        // Filter users based on admin's college
        const filteredUsers = allUsers.filter(user =>
          user.whoami === 'Alumni' && user.college.toLowerCase() === adminData.name.toLowerCase()
        );

        // Sort users by salary in descending order
        filteredUsers.sort((a, b) => {
          const salaryA = parseFloat(a.salary) || 0;
          const salaryB = parseFloat(b.salary) || 0;
          return salaryB - salaryA; // Descending order
        });

        setFilteredUsers(filteredUsers);
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

  return (
    <DashboardCard title="Top Alumni">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Role
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Salary
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.email}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1} {/* Display consecutive numbers starting from 1 */}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {user.fullName}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {user.desc}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {user.desc}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${user.salary || '-'}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
