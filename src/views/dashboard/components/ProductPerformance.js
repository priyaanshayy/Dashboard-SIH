import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const products = [
    {
        id: "1",
        name: "Vidhan Sharma",
        post: "SDE-1",
        pname: "Microsoft",
        // priority: "2023",
        pbg: "primary.main",
        budget: "55",
    },
    {
        id: "2",
        name: "Kushagra Gangwar",
        post: "SDE-2",
        pname: "Amazon",
        // priority: "Medium",
        pbg: "secondary.main",
        budget: "44",
    },
    {
        id: "3",
        name: "Shalini Kumari",
        post: "Project Manager",
        pname: "Amazon",
        // priority: "High",
        pbg: "error.main",
        budget: "32",
    },
    {
        id: "4",
        name: "Deepesh Pandey",
        post: "Frontend Engineer",
        pname: "Meta",
        priority: "Critical",
        pbg: "success.main",
        budget: "30",
    },
];


const ProductPerformance = () => {
    return (

        <DashboardCard title="MAANG Placed">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Alumni Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                Company Name
                                </Typography>
                            </TableCell>
                            {/* <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Batch
                                </Typography>
                            </TableCell> */}
                            <TableCell >
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Package
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography  variant="subtitle2" fontWeight={600}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {/* <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip> */}
                                    <Typography variant="h6">{product.budget}LPA</Typography>
                                </TableCell>
                                {/* <TableCell align="right">
                                    <Typography variant="h6">{product.budget}k</Typography>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
