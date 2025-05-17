import React, { useState } from 'react';

import {
    Paper,
    Typography,
    Box,
    TextField,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Customer() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        dateOfBirth: dayjs(),
        nic: '',
        customerHasAddressRequest: [],
        customerHasDependantRequest: [],
        customerHasMobileNumberRequest: [],
    });

    const roles = ['Admin', 'Customer', 'Manager'];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page when rows per page changes
    };

    const [customers, setCustomers] = React.useState([
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Customer' },
    ]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customer Data:', formData);
        // You can send this data to your backend here
    };

    const [selectedDateTime, setSelectedDateTime] = useState(null); // initialize as null

    const handleDateTimeChange = (newValue) => {
        setSelectedDateTime(newValue);
        console.log('Selected DateTime:', newValue?.format());
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 4,
                width: '100%',
                maxWidth: '600px',
                minHeight: '600px',
                margin: 'auto',
                mt: 5,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Create Customer Form
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        fullWidth
                        label="Date of Birth"
                        value={selectedDateTime}
                        onChange={handleChange}
                        slotProps={{ textField: { fullWidth: true, required: true, margin: 'normal' } }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    select
                    fullWidth
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
                    Create Customer
                </Button>
            </Box>

            {/* Table for customer details */}
            <TableContainer component={Paper} sx={{ maxWidth: '900px', width: '100%', margin: 'auto', mt: 5 }}>
                <Table aria-label="customer table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>No</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>DOB</b></TableCell>
                            <TableCell><b>NIC</b></TableCell>
                            <TableCell><b>ACTION</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={customers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>

    );
}
