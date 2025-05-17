import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Input } from '@mui/material';

export default function BulkUpload({ onFileUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select an Excel file to upload.');
            return;
        }
        // Pass file to parent handler
        onFileUpload(file);
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
                />
                <Button type="submit" variant="contained" fullWidth>
                    Upload File
                </Button>
            </Box>
        </Paper>
    );
}
