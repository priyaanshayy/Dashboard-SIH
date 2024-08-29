// src/components/shared/HeadingCard.js
import React from 'react';
import { Typography, CardContent, Card } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';

const HeadingCard = ({ variant, children, fontSize, lineHeight, fontWeight }) => (
  <BlankCard>
    <Card>
      <CardContent>
        <Typography
          variant={variant}
          sx={{
            fontSize: fontSize,
            lineHeight: lineHeight,
            fontWeight: fontWeight,
            mb: 1 // margin-bottom
          }}
        >
          {children}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400
          }}
        >
          font size: {fontSize} | line-height: {lineHeight} | font weight: {fontWeight}
        </Typography>
      </CardContent>
    </Card>
  </BlankCard>
);

export default HeadingCard;
