import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig'; 
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const StudentPerformance = () => {
  const [adminName, setAdminName] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
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
        const adminDocRef = doc(db, 'admins', user.uid);
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
        const filteredStudents = allUsers.filter(student => {
          const studentCollege = typeof student.college === 'string' ? student.college.toLowerCase() : '';
          return student.whoami === 'Student' && studentCollege === adminData.name.toLowerCase();
        });

        // Sort students by a specific attribute (e.g., score)
        filteredStudents.sort((a, b) => {
          const scoreA = parseFloat(a.score) || 0; 
          const scoreB = parseFloat(b.score) || 0;
          return scoreB - scoreA; 
        });

        setFilteredStudents(filteredStudents);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddStudent = () => {
    // Implement the logic to add a student (e.g., open a modal or redirect to a form page)
    console.log('Add Student button clicked');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DashboardCard title=" Students List">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Recent Batch Students</Typography>
        <Button variant="contained" color="primary" onClick={handleAddStudent}>
          Add Student
        </Button>
      </Box>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, mt: 2 }}>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Full Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  College
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tech Stack
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Posts Count
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Verified
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Description
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student, index) => (
              <TableRow key={student.email}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.fullName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.college}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.techStack || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.PostsCount || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.isverified ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {student.desc}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default StudentPerformance;
