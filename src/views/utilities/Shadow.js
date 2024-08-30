import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig'; 
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const StudentPerformance = () => {
  const [adminName, setAdminName] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    email: '',
    college: '',
    techStack: '',
    PostsCount: '',
    isverified: false,
    desc: ''
  });

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

  const handleAddStudent = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        ...newStudent,
        whoami: 'Student'
      });
      setOpen(false);
      // Optionally, refetch the students data to include the new student
    } catch (error) {
      console.error('Error adding student: ', error);
    }
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DashboardCard title=" Students List">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Our Students</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
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

      {/* Modal for Adding a Student */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-student-modal-title"
        aria-describedby="add-student-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="add-student-modal-title" variant="h6" component="h2">
            Add New Student
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              value={newStudent.fullName}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={newStudent.email}
              onChange={handleChange}
            />
            <TextField
              name="college"
              label="College"
              fullWidth
              margin="normal"
              value={newStudent.college}
              onChange={handleChange}
            />
            <TextField
              name="techStack"
              label="Tech Stack"
              fullWidth
              margin="normal"
              value={newStudent.techStack}
              onChange={handleChange}
            />
            <TextField
              name="PostsCount"
              label="Posts Count"
              fullWidth
              margin="normal"
              value={newStudent.PostsCount}
              onChange={handleChange}
            />
            <TextField
              name="desc"
              label="Description"
              fullWidth
              margin="normal"
              value={newStudent.desc}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardCard>
  );
};

export default StudentPerformance;
