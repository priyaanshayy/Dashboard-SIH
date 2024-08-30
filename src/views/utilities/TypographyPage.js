import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig'; 
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, InputAdornment, Modal } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { IconSearch } from '@tabler/icons-react';

const AlumniPerformance = () => {
  const [adminName, setAdminName] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [displayedAlumni, setDisplayedAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newAlumni, setNewAlumni] = useState({
    fullName: '',
    email: '',
    college: '',
    techStack: '',
    postsCount: '',
    isverified: false,
    desc: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

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

        const usersCollection = collection(db, 'users');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
          const allUsers = snapshot.docs.map(doc => doc.data());
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
          setDisplayedAlumni(filteredAlumni);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filteredAlumni.filter(alumni =>
      alumni.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedAlumni(filtered);
  }, [searchQuery, filteredAlumni]);

  const handleAddAlumni = () => {
    setOpen(true);
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
      setNewAlumni({
        fullName: '',
        email: '',
        college: '',
        techStack: '',
        postsCount: '',
        isverified: false,
        desc: ''
      });
      setOpen(false);
    } catch (err) {
      console.error('Error adding alumni: ', err);
    }
  };


  return (
    <DashboardCard title="Alumni List">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Our Alumni</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              width: '200px',
              marginRight: 2
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch width="20" height="20" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAddAlumni}>
            Add New Alumni
          </Button>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
          <Typography id="add-alumni-modal-title" variant="h6" component="h2">
            Add New Alumni
          </Typography>
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              value={newAlumni.fullName}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={newAlumni.email}
              onChange={handleInputChange}
            />
            <TextField
              name="college"
              label="College"
              fullWidth
              margin="normal"
              value={newAlumni.college}
              onChange={handleInputChange}
            />
            <TextField
              name="techStack"
              label="Tech Stack"
              fullWidth
              margin="normal"
              value={newAlumni.techStack}
              onChange={handleInputChange}
            />
            <TextField
              name="postsCount"
              label="Posts Count"
              fullWidth
              margin="normal"
              value={newAlumni.postsCount}
              onChange={handleInputChange}
            />
            <TextField
              name="desc"
              label="Description"
              fullWidth
              margin="normal"
              value={newAlumni.desc}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

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
            {displayedAlumni.map((alumni, index) => (
              <TableRow key={alumni.email}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {index + 1}
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