import React, { lazy } from 'react';

//  mui icons

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LanguageIcon from '@mui/icons-material/Language';


// core components/views for Admin layout
import Dashboard from './views/Dashboard/Dashboard'
import Maps from './views/Maps/Maps'
import UserProfile from './views/UserProfile/UserProfile'
import CreateStand from './views/CreateStand/CreateStand'
import Notifications from './views/Notifications/Notifications'
// const Maps = lazy(() => import('./views/Maps/Maps')); 
// const UserProfile = lazy(() => import('./views/UserProfile/UserProfile.js')); 
// const CreateStand = lazy(() => import('./views/CreateStand/CreateStand.js')); 
// const Notifications = lazy(() => import('./views/Notifications/Notifications.js')); 


const routes = [
  {
    path: "/stands",
    name: "All Stands",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/app",
  },
  {
    path: "/user-profile",
    name: "My Profile",
    icon: PersonIcon,
    component: UserProfile,
    layout: "/app",
  },
  {
    path: "/create-stand",
    name: "Create Stand",
    rtlName: "צור עמדה",
    icon: EditLocationAltIcon,
    component: CreateStand,
    layout: "/app",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "מפה",
    icon: MapIcon,
    component: Maps,
    layout: "/app",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "התראות",
    icon: NotificationsActiveIcon,
    component: Notifications,
    layout: "/app",
  },
];

export default routes;
