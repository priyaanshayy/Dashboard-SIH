import React from 'react';
import { Grid, useTheme } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import StudentsHeadingCard from 'src/components/shared/StudentsHeadingCard';
import DashboardCard from 'src/components/shared/DashboardCard';
import img1 from 'src/assets/images/students/student1.jpg';
import img2 from 'src/assets/images/students/student2.avif';
import img3 from 'src/assets/images/students/student3.jpg';

const data = [
  { id: 1, name: 'Priyanshay', age: 28, email: 'priyanshi@example.com', batch: 2025, image: img1 },
  { id: 2, name: 'Shruti', age: 34, email: 'shruti@example.com', batch: 2026, image: img2 },
  { id: 3, name: 'Joe', age: 45, email: 'joe@example.com', batch: 2027, image: img3 },
];

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
