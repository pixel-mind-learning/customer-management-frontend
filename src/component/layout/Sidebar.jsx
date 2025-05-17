import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, People, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <List>
                <ListItem button style={{ cursor: 'pointer' }} component={Link} to="/">
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button style={{ cursor: 'pointer' }} component={Link} to="/customer-form">
                    <ListItemIcon><People /></ListItemIcon>
                    <ListItemText primary="Customer" />
                </ListItem>
                <ListItem button style={{ cursor: 'pointer' }} component={Link} to="/bulk-upload">
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Bulk Upload" />
                </ListItem>
            </List>
        </Drawer>
    );
}
