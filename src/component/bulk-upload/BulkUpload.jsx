import { useRef, useState } from 'react';
import { Paper, Typography, Box, Button, Input } from '@mui/material';
import Swal from 'sweetalert2';
import { uploadExcelFile } from '../../service/CustomerService'

export default function BulkUpload() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            Swal.fire({
                title: 'Alert!',
                text: 'Please select an Excel file to upload.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const data = await uploadExcelFile(file)
            if (data.data.status == 'OK') {
                Swal.fire({
                    title: 'Success!',
                    text: 'File uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.data.message,
                })
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setFile(null);
            fileInputRef.current.value = '';
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: '600px', margin: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Bulk Upload Customers (Excel)
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Input
                    type="file"
                    inputProps={{ accept: '.xls,.xlsx' }}
                    onChange={handleFileChange}
                    fullWidth
                    sx={{ mb: 3 }}
                    ref={fileInputRef}
                />
                <Button type="submit" variant="contained" fullWidth>
                    Upload File
                </Button>
            </Box>
        </Paper>
    );
}
