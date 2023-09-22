import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuList from './MenuList';

import {useNavigate} from '../../utils/useNavigate'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


function LeftNavigation({ open, toggleDrawer, location }) {
    const navigate = useNavigate()
    const activeTab = React.useMemo(() => {
        const pathname = location.pathname
        if(pathname.includes('participants') || pathname.includes('participantdetails')) {
            return 'participants'
        }
        if(pathname.includes('organizations') || pathname.includes('organizationdetails')) {
            return 'organizations'
        }
        if(pathname.includes('analytics')) {
            return 'analytics'
        }
        return 'dashboard'
    } ,[location.pathname])

    return (
        <>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <MenuList navigate={navigate} activeTab={activeTab} />
            </Drawer>
        </>
    );
}

export default withRouter(LeftNavigation)