import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import HeadingCard from 'src/components/shared/HeadingCard';

const TypographyPage = () => {
  const [filterText, setFilterText] = useState('');
  
  const headings = [
    { variant: 'h1', fontSize: '30px', lineHeight: '45px', fontWeight: '500', text: 'h1. Heading' },
    { variant: 'h2', fontSize: '24px', lineHeight: '36px', fontWeight: '500', text: 'h2. Heading' },
    { variant: 'h3', fontSize: '21px', lineHeight: '31.5px', fontWeight: '500', text: 'h3. Heading' },
    { variant: 'h4', fontSize: '18px', lineHeight: '27px', fontWeight: '500', text: 'h4. Heading' },
    { variant: 'h5', fontSize: '16px', lineHeight: '24px', fontWeight: '500', text: 'h5. Heading' },
    { variant: 'h6', fontSize: '14px', lineHeight: '21px', fontWeight: '500', text: 'h6. Heading' },
    { variant: 'subtitle1', fontSize: '16px', lineHeight: '28px', fontWeight: '400', text: 'subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur' },
    { variant: 'subtitle2', fontSize: '14px', lineHeight: '21px', fontWeight: '400', text: 'subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur' },
    { variant: 'body1', fontSize: '16px', lineHeight: '24px', fontWeight: '400', text: 'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur' },
    { variant: 'body2', fontSize: '14px', lineHeight: '20px', fontWeight: '400', text: 'body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur' },
    { variant: 'caption', fontSize: '12px', lineHeight: '19px', fontWeight: '400', text: 'caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur' },
    { variant: 'overline', fontSize: '12px', lineHeight: '31px', fontWeight: '400', text: 'overline. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur' },
  ];

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
  };

  const filteredHeadings = headings.filter(item => item.text.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <PageContainer title="Typography" description="this is Typography">
      <div className='my-3'>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <TextField
            label="Filter"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            className='dash-filter'
            fullWidth
          />
          <Button variant="contained" color="primary" className='add-btn' onClick={() => { /* Handle button click */ }}>
            Add Typography
          </Button>
        </div>
        <Grid container spacing={3}>
          {filteredHeadings.map((heading, index) => (
            <Grid item sm={12} key={index}>
              <DashboardCard title={heading.variant}>
                <HeadingCard
                  variant={heading.variant}
                  fontSize={heading.fontSize}
                  lineHeight={heading.lineHeight}
                  fontWeight={heading.fontWeight}
                >
                  {heading.text}
                </HeadingCard>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </PageContainer>
  );
};

export default TypographyPage;
