import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import List from '@mui/material/List';
import "./index.css"

const MenuList = ({ navigate, activeTab }) => {
    return (
        <List component="nav">
            <React.Fragment>
                <ListItemButton selected={activeTab==='dashboard'} onClick={() => navigate('dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton selected={activeTab==='participants'} onClick={() => navigate("participants")}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Participants" />
                </ListItemButton>
                <ListItemButton selected={activeTab==='organizations'} onClick={() => navigate("organizations")}>
                    <ListItemIcon>
                        <Diversity1Icon />
                    </ListItemIcon>
                    <ListItemText primary="Organizations" />
                </ListItemButton>
                <ListItemButton selected={activeTab==='analytics'} onClick={() => navigate("analytics")}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Analytics" />
                </ListItemButton>
            </React.Fragment>
        </List>
    )
}

export default MenuList;
