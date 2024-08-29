import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebaseConfig'; 
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'admins', user.uid), {
                name,
                email,
                uid: user.uid,
            });

            navigate('/auth/login');
        } catch (error) {
            console.error("Error registering user:", error);
        }
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
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
