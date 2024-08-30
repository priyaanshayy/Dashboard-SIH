import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebaseConfig'; 
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [color, setColor] = useState('#1976d2'); // Default color
    const [collegeId, setCollegeId] = useState(''); // New state for college ID
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store the user data along with the color setting and college ID
            await setDoc(doc(db, 'admins', user.uid), {
                name,
                email,
                uid: user.uid,
                color, // Store the color setting
                collegeId // Store the college ID
            });

            navigate('/auth/login');
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">College Name</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='collegeId' mb="5px" mt="25px">College ID</Typography>
                    <CustomTextField id="collegeId" variant="outlined" fullWidth value={collegeId} onChange={(e) => setCollegeId(e.target.value)} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='color' mb="5px" mt="25px">Select Theme Color</Typography>
                    <CustomTextField id="color" variant="outlined" fullWidth type="color" value={color} onChange={handleColorChange} />
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
