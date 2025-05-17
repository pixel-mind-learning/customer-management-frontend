import React, { useEffect, useState } from 'react';

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
    Select,
    TablePagination,
} from '@mui/material';
import { getAllCities, getAllCountries } from '../../service/LocationService';
import { createUser } from '../../service/CustomerService'
import Swal from 'sweetalert2';

export default function Customer() {
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        dateOfBirth: '',
        nic: '',
        customerHasAddressRequest: [],
        customerHasDependantRequest: [],
        customerHasMobileNumberRequest: [],
    });
    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Adding customer addresses
    const [cusAddressesFields, setCusAddressesFields] = useState([
        {
            id: 1,
        }
    ]);
    const addCustomerAddressField = () => {
        setCusAddressesFields([
            ...cusAddressesFields,
            {
                id: cusAddressesFields.length + 1,
            }
        ]);
    }
    const [cusAddresses, setCusAddresses] = useState([{}]);
    const handleCustomerAddressChange = (id, field, value) => {
        const addressArrayIndex = id - 1
        setCusAddresses((prevFields) => {
            const updatedObjects = [...prevFields]
            updatedObjects[addressArrayIndex] = {
                ...updatedObjects[addressArrayIndex],
                [field]: value,
            }
            return updatedObjects
        })
        console.log('Customer Address:', cusAddresses);
    }

    // Adding customer contacts
    const [cusContactsFields, setCusContactsFields] = useState([
        {
            id: 1,
        }
    ]);
    const addCustomerContactField = () => {
        setCusContactsFields([
            ...cusContactsFields,
            {
                id: cusContactsFields.length + 1,
            }
        ]);
    }
    const [mobileNumers, setMobileNumbers] = useState([{}]);
    const handleCustomerContactChange = (id, field, value) => {
        const contactArrayIndex = id - 1
        setMobileNumbers((prevFields) => {
            const updatedObjects = [...prevFields]
            updatedObjects[contactArrayIndex] = {
                ...updatedObjects[contactArrayIndex],
                [field]: value,
            }
            return updatedObjects
        })
        console.log('Customer Contact:', mobileNumers);
    }

    // Adding customer dependants
    const [cusDependantFields, setCusDependantFields] = useState([
        {
            id: 1,
        }
    ]);
    const addDependantField = () => {
        setCusDependantFields([
            ...cusDependantFields,
            {
                id: cusDependantFields.length + 1,
            }
        ]);
    }
    const [dependants, setDependants] = useState([{}]);
    const handleDependantChange = (id, field, value) => {
        const depArrayIndex = id - 1
        setDependants((prevFields) => {
            const updatedObjects = [...prevFields]
            updatedObjects[depArrayIndex] = {
                ...updatedObjects[depArrayIndex],
                [field]: value,
            }
            return updatedObjects
        })
        console.log('Dependant :', dependants);
    }

    // Adding dependants addresses
    const [cusDependantAddressesFields, setCusDependantAddressesFields] = useState([
        {
            id: 1,
        }
    ]);

    // Adding dependants contacts
    const [cusDependantContactsFields, setCusDependantContactsFields] = useState([
        {
            id: 1,
        }
    ]);

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

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const updatedForm = { ...formData }
            updatedForm.customerHasAddressRequest = cusAddresses
            updatedForm.customerHasDependantRequest = dependants
            updatedForm.customerHasMobileNumberRequest = mobileNumers
            try {
                const data = await createUser(updatedForm)
                if (data.status === 'OK') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data.message,
                    })
                }
            } catch (error) {
                console.error('Error occuring while creating customer. ', error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.details[1],
                })
            }
        }
    };

    useEffect(() => {
        handleGetAllCities();
        handleGetAllCountries();
    }, []);

    const handleGetAllCities = async () => {
        const data = await getAllCities();
        if (data.data.status == 'OK') {
            setCities(data.data.data);
        } else {
            console.error('Error fetching cities:', data.data.message);
        }
    }

    const handleGetAllCountries = async () => {
        const data = await getAllCountries();
        if (data.data.status == 'OK') {
            setCountries(data.data.data);
        } else {
            console.error('Error fetching countries:', data.data.message);
        }
    }

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
                <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="NIC"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                {/* Customer Location info form started */}
                <Typography variant="h6" sx={{ mt: 3 }}>Customer Location Info.</Typography>

                {cusAddressesFields.map((field, index) => (
                    <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                        <Typography variant="subtitle1">Location {index + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Address Line 1"
                            name="addressLine1"
                            margin="normal"
                            onChange={(e) => {
                                handleCustomerAddressChange(field.id, 'addressLine1', e.target.value)
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Address Line 2"
                            name="addressLine2"
                            margin="normal"
                            onChange={(e) => {
                                handleCustomerAddressChange(field.id, 'addressLine2', e.target.value)
                            }}
                            required
                        />
                        <Select
                            labelId="country-label"
                            name="countryId"
                            fullWidth
                            onChange={(e) => {
                                handleCustomerAddressChange(field.id, 'countryId', e.target.value)
                            }}
                            style={{ marginTop: '20px' }}
                        >
                            <MenuItem value="-1" key='0'>
                                <em>Select a Country</em>
                            </MenuItem>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.countryName}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            labelId="city-label"
                            name="cityId"
                            fullWidth
                            onChange={(e) => {
                                handleCustomerAddressChange(field.id, 'cityId', e.target.value)
                            }}
                            style={{ marginTop: '20px' }}
                        >
                            <MenuItem value="-1" key='0'>
                                <em>Select a City</em>
                            </MenuItem>
                            {cities.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.cityName}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                ))}

                <Button sx={{ mt: 2 }} variant="outlined" onClick={() => addCustomerAddressField()}>
                    Add Another Address
                </Button>

                {/* Contact info form started */}
                <Typography variant="h6" sx={{ mt: 3 }}>Customer Contact Info.</Typography>

                {cusContactsFields.map((field, index) => (
                    <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                        <Typography variant="subtitle1">Contact {index + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Mobile No"
                            name="mobileNumber"
                            margin="normal"
                            onChange={(e) => {
                                handleCustomerContactChange(field.id, 'mobileNumber', e.target.value)
                            }}
                            required
                        />
                    </Box>
                ))}

                <Button sx={{ mt: 2 }} variant="outlined" onClick={() => addCustomerContactField()}>
                    Add Another Contact
                </Button>
                {/* Customer Location info form ended */}

                {/* Dependant form started */}
                <Typography variant="h6" sx={{ mt: 3 }}>Dependant Info.</Typography>

                {cusDependantFields.map((field, index) => (
                    <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                        <Typography variant="subtitle1">Dependant {index + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            onChange={(e) => {
                                handleDependantChange(field.id, 'name', e.target.value)
                            }}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                handleDependantChange(field.id, 'dateOfBirth', e.target.value)
                            }}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="NIC"
                            name="nic"
                            onChange={(e) => {
                                handleDependantChange(field.id, 'nic', e.target.value)
                            }}
                            margin="normal"
                            required
                        />
                        <Select
                            labelId="relationship-label"
                            name="relationshipType"
                            fullWidth
                            onChange={(e) => {
                                handleDependantChange(field.id, 'relationshipType', e.target.value)
                            }}
                            style={{ marginTop: '20px' }}
                        >
                            <MenuItem value="-1" key='0'>
                                <em>Select a relationship type</em>
                            </MenuItem>
                            <MenuItem value="Spouse" key='1'>
                                <em>Spouse</em>
                            </MenuItem>
                            <MenuItem value="Child" key='2'>
                                <em>Child</em>
                            </MenuItem>
                            <MenuItem value="Parent" key='3'>
                                <em>Parent</em>
                            </MenuItem>
                        </Select>

                        {/* Dependant Location info form started */}
                        <Typography variant="h6" sx={{ mt: 3 }}>Dependant Location Info.</Typography>

                        {cusAddresses.map((address, index) => (
                            <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mt: 2 }}>
                                <Typography variant="subtitle1">Location {index + 1}</Typography>
                                <TextField
                                    fullWidth
                                    label="Address Line 1"
                                    name="addressLine1"
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Address Line 2"
                                    name="addressLine2"
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    select
                                    fullWidth
                                    label="City"
                                    name="cityId"
                                    margin="normal"
                                    required
                                >
                                    {/* {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))} */}
                                </TextField>
                                <TextField
                                    select
                                    fullWidth
                                    label="Country"
                                    name="countryId"
                                    margin="normal"
                                    required
                                >
                                    {/* {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))} */}
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
                <br></br>
                <Button sx={{ mt: 2 }} variant="outlined" onClick={() => addDependantField()}>
                    Add Another Dependant
                </Button>

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
