// src/components/shared/HeadingCard.js
import React from 'react';
import { Typography, CardContent } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';

const HeadingCard = ({ variant, children, fontSize, lineHeight, fontWeight, color }) => (
  <BlankCard>
    <CardContent>
      <Typography variant={variant} sx={{ fontSize, lineHeight, fontWeight, color }}>
        {children}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        font size: {fontSize} | line-height: {lineHeight} | font weight: {fontWeight}
      </Typography>
    </CardContent>
  </BlankCard>
);

export default HeadingCard;
