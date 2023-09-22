import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import HeaderBar from './NavigationBar/HeaderBar';
import LeftNavigation from './NavigationBar/LeftNavigation';
import HomeRoute from '../route/HomeRoute';

export default function PrimarySearchAppBar() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', height: '100vh' }}>
            <HeaderBar toggleDrawer={toggleDrawer} open={open} />
            <LeftNavigation open={open} toggleDrawer={toggleDrawer} />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[50]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ my: 4, flexGrow: 1, display: 'flex'}}>
                    <HomeRoute />
                </Container>
            </Box>
        </Box>
    );
}