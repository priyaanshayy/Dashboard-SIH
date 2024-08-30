import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Box, Stack } from '@mui/material';
import { FaAmazon, FaApple, FaFacebook, FaMicrosoft } from 'react-icons/fa'; // Import icons
import img1 from 'src/assets/images/products/s05.jpg';
import img2 from 'src/assets/images/products/s09.jpg';
import img3 from 'src/assets/images/products/s07.jpg';
import img4 from 'src/assets/images/products/s06.jpg';
import BlankCard from '../../../components/shared/BlankCard';

const ecoCard = [
    {
        title: 'Noah Johnson',
        subheader: 'September 14, 2023',
        photo: img1,
        salesPrice: 105,
        price: 'Network Engineer at Microsoft',
        icon: <FaMicrosoft size={24} />, // No icon for Cisco
    },
    {
        title: 'Olivia Taylor',
        subheader: 'September 14, 2023',
        photo: img2,
        salesPrice: 75,
        price: 'Product Designer at Apple',
        icon: <FaApple size={24} />, // Apple icon, increased size
    },
    {
        title: 'Jack Brown',
        subheader: 'September 14, 2023',
        photo: img3,
        salesPrice: 150,
        price: 'Marketing Manager at Facebook',
        icon: <FaFacebook size={24} />, // Facebook icon, increased size
    },
    {
        title: 'Lisa Brown',
        subheader: 'September 14, 2023',
        photo: img4,
        salesPrice: 285,
        price: 'Data Analyst at Amazon',
        icon: <FaAmazon size={24} />, // Amazon icon, increased size
    },
];

const Blog = () => {
    return (
        <Grid container spacing={3}>
            {ecoCard.map((product, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <Box
                            component={Link}
                            to="/"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '200px', // Increased height for larger photos
                                overflow: 'hidden',
                                mt: 2, // Top margin
                            }}
                        >
                            <img 
                                src={product.photo} 
                                alt="img" 
                                style={{ 
                                    maxWidth: '90%', // Slightly larger max width
                                    maxHeight: '90%', // Slightly larger max height
                                    objectFit: 'contain' 
                                }} 
                            />
                        </Box>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Typography variant="h6">{product.title}</Typography>
                                {product.icon && (
                                    <Box sx={{ ml: 1 }}>
                                        {product.icon}
                                    </Box>
                                )}
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Typography variant="h6">{product.price}</Typography>
                                <Typography color="textSecondary" ml={1}>
                                    ${product.salesPrice}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
