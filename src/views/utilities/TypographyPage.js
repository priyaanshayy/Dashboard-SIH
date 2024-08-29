import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import HeadingCard from 'src/components/shared/HeadingCard';
import DashboardCard from '../../components/shared/DashboardCard';

const typographyData = [
  { variant: 'h1', fontSize: '30px', lineHeight: '45px', fontWeight: '500', text: 'h1. Heading' },
  { variant: 'h2', fontSize: '24px', lineHeight: '36px', fontWeight: '500', text: 'h2. Heading' },
  { variant: 'h3', fontSize: '21px', lineHeight: '31.5px', fontWeight: '500', text: 'h3. Heading' },
  { variant: 'h4', fontSize: '18px', lineHeight: '27px', fontWeight: '500', text: 'h4. Heading' },
  { variant: 'h5', fontSize: '16px', lineHeight: '24px', fontWeight: '500', text: 'h5. Heading' },
  { variant: 'h6', fontSize: '14px', lineHeight: '21px', fontWeight: '500', text: 'h6. Heading' },
  { variant: 'subtitle1', fontSize: '16px', lineHeight: '28px', fontWeight: '400', text: 'subtitle1. Lorem ipsum dolor sit amet...' },
  { variant: 'subtitle2', fontSize: '14px', lineHeight: '21px', fontWeight: '400', text: 'subtitle2. Lorem ipsum dolor sit amet...' },
  { variant: 'body1', fontSize: '16px', lineHeight: '24px', fontWeight: '400', text: 'body1. Lorem ipsum dolor sit amet...' },
  { variant: 'body2', fontSize: '14px', lineHeight: '20px', fontWeight: '400', text: 'body2. Lorem ipsum dolor sit amet...' },
  { variant: 'caption', fontSize: '12px', lineHeight: '19px', fontWeight: '400', text: 'caption. Lorem ipsum dolor sit amet...' },
  { variant: 'overline', fontSize: '12px', lineHeight: '31px', fontWeight: '400', text: 'overline. Lorem ipsum dolor sit amet...' }
];

const TypographyPage = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
  };

  // Filter typographyData based on filterText if needed (optional)
  const filteredTypographyData = typographyData.filter(typography =>
    typography.text.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <PageContainer title="Typography" description="This is Typography">
      <div className='my-3'>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Filter by Text"
            value={filterText}
            onChange={handleFilterChange}
            className='dash-filter'
          />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title="Typography Examples">
              <Grid container spacing={3}>
                {filteredTypographyData.map((typography, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <HeadingCard
                      variant={typography.variant}
                      fontSize={typography.fontSize}
                      lineHeight={typography.lineHeight}
                      fontWeight={typography.fontWeight}
                    >
                      {typography.text}
                    </HeadingCard>
                  </Grid>
                ))}
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default TypographyPage;
