// src/pages/TypographyPage.js
import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import StudentsHeadingCard from 'src/components/shared/StudentsHeadingCard';
import DashboardCard from 'src/components/shared/DashboardCard';

const data = [
  { id: 1, name: 'Priyanshay', age: 28, email: 'priyanshi@example.com', batch: 2025, image: 'https://imgv3.fotor.com/images/blog-richtext-image/a-woman-in-black-suit.jpg' },
  { id: 2, name: 'Shruti', age: 34, email: 'shruti@example.com',  batch: 2026, image: 'https://imgv3.fotor.com/images/blog-cover-image/ID-Photo-Requirements-for-Passport-and-Identity-Card.jpg' },
  { id: 3, name: 'Joe', age: 45, email: 'joe@example.com',  batch: 2027, image: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg' },
];

const colors = ['#bbdefb', '#c8e6c9', '#ffecb3', '#d7ccc8', '#e0f2f1', '#ffcdd2', '#d1c4e9'];

const TypographyPage = () => {
  return (
    <PageContainer title="Students" description="Students">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="Students">
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <StudentsHeadingCard
                    variant="h3"
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
