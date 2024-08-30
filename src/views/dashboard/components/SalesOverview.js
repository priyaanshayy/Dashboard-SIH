import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebaseConfig'; // Adjust path as necessary
import chroma from 'chroma-js'; // Import chroma-js

const SalesOverview = () => {
    // State for month selection and chart colors
    const [month, setMonth] = useState('1');
    const [chartColor, setChartColor] = useState('#1976d2'); // Default color

    // Fetch color setting from Firestore
    useEffect(() => {
        const fetchColorSetting = async () => {
            try {
                if (auth.currentUser) {
                    const userDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const fetchedColor = userData.color || '#1976d2'; // Default color if not set
                        console.log("Fetched color:", fetchedColor); // Log fetched color
                        setChartColor(fetchedColor);
                    } else {
                        console.error("No such document!");
                    }
                } else {
                    console.error("No authenticated user found!");
                }
            } catch (error) {
                console.error("Error fetching color setting:", error);
            }
        };

        fetchColorSetting();
    }, []);

    // Handle month change
    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    // Use chroma-js to create a shade of the main color
    const secondaryColor = chroma(chartColor).darken(1.5).hex(); // Darker shade of chartColor

    // Chart color and options
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [chartColor, secondaryColor], // Use main color and its shade
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    const seriescolumnchart = [
        {
            name: 'Alumnis',
            data: [355, 390, 300, 350, 390, 180, 355, 390],
        },
        {
            name: 'Students',
            data: [280, 250, 325, 215, 250, 310, 280, 250],
        },
    ];

    return (
        <DashboardCard
            title="Users Overview"
            action={
                <Select
                    labelId="month-dd"
                    id="month-dd"
                    value={month}
                    size="small"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>March 2023</MenuItem>
                    <MenuItem value={2}>April 2022</MenuItem>
                    <MenuItem value={3}>May 2021</MenuItem>
                </Select>
            }
        >
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
