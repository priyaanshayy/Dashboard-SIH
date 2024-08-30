import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Box, Stack } from '@mui/material';
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
        price: 'Network Engineer at Cisco',
    },
    {
        title: 'Olivia Taylor',
        subheader: 'September 14, 2023',
        photo: img2,
        salesPrice: 75,
        price: 'Product Designer at Apple',
    },
    {
        title: 'Jack Brown',
        subheader: 'September 14, 2023',
        photo: img3,
        salesPrice: 150,
        price: 'Marketing Manager at Facebook',
    },
    {
        title: 'Lisa Brown',
        subheader: 'September 14, 2023',
        photo: img4,
        salesPrice: 285,
        price: 'Data Analyst at Amazon',
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
                            <Typography variant="h6">{product.title}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">{product.price}</Typography>
                                    <Typography color="textSecondary" ml={1}>
                                        ${product.salesPrice}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
