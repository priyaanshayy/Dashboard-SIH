import React from 'react';
import { Typography, CardContent, Card } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';

const HeadingCard = ({ variant, fontSize, lineHeight, fontWeight, color, backgroundColor, data }) => (
  <Card sx={{ backgroundColor, borderRadius: '8px', boxShadow: 3 }}>
    <CardContent>
    
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color }}>
        {`Name: ${data.name}`}
      </Typography>
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color }}>
        {`Age: ${data.age}`}
      </Typography>
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color }}>
        {`Email: ${data.email}`}
      </Typography>
     
    </CardContent>
  </Card>
);

export default HeadingCard;
