import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Box, Toolbar } from '@mui/material';

const drawerWidth = 150;

export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 5, p: 8, ml: `${drawerWidth}px`, mt: '10px' }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
