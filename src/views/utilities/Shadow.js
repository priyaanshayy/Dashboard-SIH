import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig'; 
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, InputAdornment, Grid, IconButton } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { IconSearch, IconTrash } from '@tabler/icons-react';

const StudentPerformance = () => {
  const [adminName, setAdminName] = useState('');
  const [adminColor, setAdminColor] = useState('#1976d2'); // Default color
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error('No user is currently logged in.');
        }

        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDoc = await getDoc(adminDocRef);

        if (!adminDoc.exists()) {
          throw new Error('Admin document does not exist.');
        }

        const adminData = adminDoc.data();
        setAdminName(adminData.name.toLowerCase());
        setAdminColor(adminData.color || '#1976d2');

        const usersCollectionRef = collection(db, 'users');
        
        // Real-time listener
        const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
          const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          const filteredStudents = allUsers.filter(student => {
            const studentCollege = typeof student.college === 'string' ? student.college.toLowerCase() : '';
            return student.whoami === 'Student' && studentCollege === adminData.name.toLowerCase();
          });

          filteredStudents.sort((a, b) => {
            const scoreA = parseFloat(a.score) || 0;
            const scoreB = parseFloat(b.score) || 0;
            return scoreB - scoreA;
          });

          setFilteredStudents(filteredStudents);
          setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddStudent = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        ...newStudent,
        whoami: 'Student',
        college: adminName
      });
      setOpen(false);
    } catch (error) {
      console.error('Error adding student: ', error);
    }
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = filteredStudents.filter(student => 
      student.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filtered = filteredStudents.filter(student => 
      student.techStack.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteDoc(doc(db, 'users', id));
      } catch (error) {
        console.error('Error deleting student: ', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DashboardCard title="Students List">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Our Students</Typography>
        <Grid container alignItems="right" spacing={2} sx={{ maxWidth: '400px', ml: 'auto', justifyContent: 'flex-end' }}>
          <Grid item>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                width: '200px',
                marginRight: '16px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch width="20" height="20" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: adminColor }}
          onClick={handleOpen}
        >
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
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Actions
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
                <TableCell>
                  <IconButton onClick={() => handleDelete(student.id)} color="error">
                    <IconTrash width="20" height="20" />
                  </IconButton>
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
            Add Student
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              margin="normal"
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={newStudent.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              variant="outlined"
              value={newStudent.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="college"
              label="College"
              variant="outlined"
              value={newStudent.college}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="techStack"
              label="Tech Stack"
              variant="outlined"
              value={newStudent.techStack}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="PostsCount"
              label="Posts Count"
              variant="outlined"
              value={newStudent.PostsCount}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="desc"
              label="Description"
              variant="outlined"
              value={newStudent.desc}
              onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 2, bgcolor: '#007bff', color: 'white', '&:hover': { bgcolor: '#0056b3' } }}
                onClick={handleAddStudent}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </DashboardCard>
  );
};

export default StudentPerformance;
