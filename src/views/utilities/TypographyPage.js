import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import HeadingCard from 'src/components/shared/HeadingCard';
import DashboardCard from 'src/components/shared/DashboardCard';

const data = [
    { id: 1, name: 'Priyanshay ', age: 28, email: 'priyu@example.com' },
    { id: 2, name: 'Shruti', age: 34, email: 'shruti@example.com' },
    { id: 3, name: 'Joe', age: 45, email: 'joe@example.com' },
];

const colors = ['#f8bbd0', '#bbdefb', '#c8e6c9', '#ffecb3', '#d7ccc8', '#e0f2f1', '#ffcdd2', '#d1c4e9'];

const TypographyPage = () => {
  return (
    <PageContainer title="Alumni" description="Alumni">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="Alumni">
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <HeadingCard
                    variant="h6"
                    fontSize="16px"
                    lineHeight="24px"
                    fontWeight="400"
                    color="#000"
                    backgroundColor={colors[index % colors.length]}
                    data={item}
                  />
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
