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

    const [addresses, setAddresses] = useState([
        {
            type: 'Home',
            street: '123 Main St',
            city: 'Colombo',
            state: 'Western Province',
            postalCode: '00100',
            country: 'Sri Lanka'
        }
    ]);

    const [mobileNumers, setMobileNumbers] = useState([
        {
            mobileNumer: '0770437288'
        }
    ]);

    const [dependants, setDependants] = useState([
        {
            name: '0770437288',
            dateOfBirth: '1999-01-02',
            nic: '19950232140',
            relationshipType: 'Spouse',
            customerHasAddressRequest: [],
            customerHasMobileNumberRequest: [],
        }
    ]);

    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleDateTimeChange = (newValue) => {
        setSelectedDateTime(newValue);
        console.log('Selected DateTime:', newValue?.format());
    };

    const roles = ['Admin', 'Customer', 'Manager'];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

            {/* Customer form started */}
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
                        onChange={handleDateTimeChange}
                        slotProps={{ textField: { fullWidth: true, required: true, margin: 'normal' } }}
                        renderInput={(params) => <TextField {...params} />}
                        required
                    />
                </LocalizationProvider>
                <TextField
                    fullWidth
                    label="NIC"
                    name="NIC"
                    value={formData.nic}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                {/* Customer Location info form started */}
                <Typography variant="h6" sx={{ mt: 3 }}>Customer Location Info.</Typography>

                {addresses.map((address, index) => (
                    <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                        <Typography variant="subtitle1">Location {index + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Address Line 1"
                            name="addressLine1"
                            value={address.addressLine1}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Address Line 2"
                            name="addressLine2"
                            value={address.addressLine2}
                            margin="normal"
                            required
                        />
                        <TextField
                            select
                            fullWidth
                            label="City"
                            name="cityId"
                            value={address.cityId}
                            margin="normal"
                            required
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="Country"
                            name="countryId"
                            value={address.countryId}
                            margin="normal"
                            required
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                ))}

                <Button sx={{ mt: 2 }} variant="outlined">
                    Add Another Address
                </Button>

                {/* Contact info form started */}
                <Typography variant="h6" sx={{ mt: 3 }}>Customer Contact Info.</Typography>

                {mobileNumers.map((mobileNo, index) => (
                    <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                        <Typography variant="subtitle1">Contact {index + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Mobile No"
                            name="mobileNumber"
                            value={mobileNo.mobileNumer}
                            margin="normal"
                            required
                        />
                    </Box>
                ))}

                <Button sx={{ mt: 2 }} variant="outlined">
                    Add Another Contact
                </Button>
                {/* Customer Location info form ended */}

                {/* Dependant form started */}
                <Typography variant="h6" sx={{ mt: 3 }}>Dependant Info.</Typography>

                {dependants.map((dependant, index) => (
                    <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                        <Typography variant="subtitle1">Dependant {index + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={dependant.name}
                            margin="normal"
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                fullWidth
                                label="Date of Birth"
                                value={selectedDateTime}
                                onChange={handleDateTimeChange}
                                slotProps={{ textField: { fullWidth: true, required: true, margin: 'normal' } }}
                                renderInput={(params) => <TextField {...params} />}
                                required
                            />
                        </LocalizationProvider>
                        <TextField
                            fullWidth
                            label="NIC"
                            name="NIC"
                            value={formData.nic}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        {/* Dependant Location info form started */}
                        <Typography variant="h6" sx={{ mt: 3 }}>Dependant Location Info.</Typography>

                        {addresses.map((address, index) => (
                            <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                                <Typography variant="subtitle1">Location {index + 1}</Typography>
                                <TextField
                                    fullWidth
                                    label="Address Line 1"
                                    name="addressLine1"
                                    value={address.addressLine1}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Address Line 2"
                                    name="addressLine2"
                                    value={address.addressLine2}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    select
                                    fullWidth
                                    label="City"
                                    name="cityId"
                                    value={address.cityId}
                                    margin="normal"
                                    required
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    fullWidth
                                    label="Country"
                                    name="countryId"
                                    value={address.countryId}
                                    margin="normal"
                                    required
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        ))}

                        <Button sx={{ mt: 2 }} variant="outlined">
                            Add Another Address
                        </Button>

                        {/* Dependant Contact info form started */}
                        <Typography variant="h6" sx={{ mt: 3 }}>Dependant Contact Info.</Typography>

                        {mobileNumers.map((mobileNo, index) => (
                            <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                                <Typography variant="subtitle1">Contact {index + 1}</Typography>
                                <TextField
                                    fullWidth
                                    label="Mobile No"
                                    name="mobileNumber"
                                    value={mobileNo.mobileNumer}
                                    margin="normal"
                                    required
                                />
                            </Box>
                        ))}

                        <Button sx={{ mt: 2 }} variant="outlined">
                            Add Another Contact
                        </Button>

                        {/* Dependant Location info form ended */}
                    </Box>

                ))}

                <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
                    Create Customer
                </Button>
                {/* Customer form ended */}
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
