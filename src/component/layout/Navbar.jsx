import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navbar() {
    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    JSF Holdings Customer Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
