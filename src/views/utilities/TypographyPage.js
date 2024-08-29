// src/pages/TypographyPage.js
import React from 'react';
import { Grid,useTheme} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import HeadingCard from 'src/components/shared/HeadingCard';
import DashboardCard from 'src/components/shared/DashboardCard';
import img1 from 'src/assets/images/alumni/alumni1.jpg';
import img2 from 'src/assets/images/alumni/alumni2.jpg';
import img3 from 'src/assets/images/alumni/alumni3.webp';

const data = [
  { id: 1, name: 'Priyanshay', age: 28, email: 'priyanshi@example.com', company: 'Google', batch: 2021, image: img1 },
  { id: 2, name: 'Shruti', age: 34, email: 'shruti@example.com', company: 'Microsoft', batch: 2020, image: img2 },
  { id: 3, name: 'Joe', age: 45, email: 'joe@example.com', company: 'Facebook', batch: 2022, image: img3},
];

// const colors = ['#bbdefb', '#c8e6c9', '#ffecb3', '#d7ccc8', '#e0f2f1', '#ffcdd2', '#d1c4e9'];

const TypographyPage = () => {
  const theme = useTheme(); // Get the theme object

  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.info.light,
    theme.palette.success.light,
    theme.palette.warning.light,
    theme.palette.error.light,
    theme.palette.grey[200],
  ];

  return (
    <PageContainer title="Alumni" description="Alumni">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="Alumni">
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <HeadingCard
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
