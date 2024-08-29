// src/components/shared/HeadingCard.js
import React from 'react';
import { Typography, CardContent, Card, CardMedia } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';

const StudentsHeadingCard = ({ variant, fontSize, lineHeight, fontWeight, color, backgroundColor, data }) => (
  <Card
    sx={{
      backgroundColor,
      borderRadius: '8px',
      boxShadow: 3,
      minHeight: '200px', // Increase card height
      padding: '16px', // Add padding for spacing
      position: 'relative',
    }}
  >
    <CardMedia
      component="img"
      src={data.image}
      alt={data.name}
      sx={{
        position: 'absolute',
        
  top: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid white', 
      }}
    />
    <CardContent>
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color, mb: 1 }}>
        {`Name: ${data.name}`}
      </Typography>
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color, mb: 1 }}>
        {`Age: ${data.age}`}
      </Typography>
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color, mb: 1 }}>
        {`Email: ${data.email}`}
      </Typography>
     
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color }}>
        {`Batch: ${data.batch}`}
      </Typography>
    </CardContent>
  </Card>
);

export default StudentsHeadingCard;
