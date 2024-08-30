import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig'; 
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Paper, Modal } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const AlumniPerformance = () => {
  const [adminName, setAdminName] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State to control the Modal visibility
  const [newAlumni, setNewAlumni] = useState({
    fullName: '',
    email: '',
    college: '',
    techStack: '',
    postsCount: '',
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

        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDoc = await getDoc(adminDocRef);

        if (!adminDoc.exists()) {
          throw new Error('Admin document does not exist.');
        }

        const adminData = adminDoc.data();
        setAdminName(adminData.name.toLowerCase());

        const usersSnapshot = await getDocs(collection(db, 'users'));
        const allUsers = usersSnapshot.docs.map(doc => doc.data());

        const filteredAlumni = allUsers.filter(alumni => {
          const alumniCollege = typeof alumni.college === 'string' ? alumni.college.toLowerCase() : '';
          return alumni.whoami === 'Alumni' && alumniCollege === adminData.name.toLowerCase();
        });

        filteredAlumni.sort((a, b) => {
          const scoreA = parseFloat(a.score) || 0;
          const scoreB = parseFloat(b.score) || 0;
          return scoreB - scoreA;
        });

        setFilteredAlumni(filteredAlumni);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAlumni = () => {
    setOpen(true); // Show the Modal when the button is clicked
  };

  const handleInputChange = (e) => {
    setNewAlumni({
      ...newAlumni,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        ...newAlumni,
        whoami: 'Alumni',
        college: adminName,
      });
      setFilteredAlumni([...filteredAlumni, newAlumni]);
      setOpen(false); // Close the Modal after form submission
      setNewAlumni({
        fullName: '',
        email: '',
        college: '',
        techStack: '',
        postsCount: '',
        isverified: false,
        desc: ''
      });
    } catch (err) {
      console.error('Error adding alumni: ', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DashboardCard title="Alumni List">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Our Alumni
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddAlumni}>
          Add New Alumni
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)} // Close the Modal when the backdrop is clicked
        aria-labelledby="add-alumni-modal-title"
        aria-describedby="add-alumni-modal-description"
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
          <Typography variant="h6" mb={2}>
            Add New Alumni
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={newAlumni.fullName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={newAlumni.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="college"
              label="College"
              variant="outlined"
              value={newAlumni.college}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="techStack"
              label="Tech Stack"
              variant="outlined"
              value={newAlumni.techStack}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="postsCount"
              label="Posts Count"
              variant="outlined"
              value={newAlumni.postsCount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="isverified"
              label="Verified"
              variant="outlined"
              value={newAlumni.isverified}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="desc"
              label="Description"
              variant="outlined"
              value={newAlumni.desc}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

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
            {filteredAlumni.map((alumni, index) => (
              <TableRow key={alumni.email}>
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
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.fullName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.college}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.techStack || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.postsCount || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.isverified ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {alumni.desc}
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

export default AlumniPerformance;
