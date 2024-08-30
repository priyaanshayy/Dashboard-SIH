import { useMediaQuery, Box, Drawer, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Ensure you have this import
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import { Sidebar, Logo } from 'react-mui-sidebar';
import logo from '../../../assets/images/logos/logo1.png';

const MSidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const sidebarWidth = '270px';

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  const sidebarContent = (
    <Box sx={{ height: '100%' }}>
      <Sidebar
        width={sidebarWidth}
        collapsewidth="80px"
        open={props.isSidebarOpen}
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        <Logo img={logo} />
        <Box>
          <SidebarItems />
          
        </Box>
      </Sidebar>
    </Box>
  );

  const logoutButton = (
    <Box sx={{ p: 2 }}>
      <Button
        to="/auth/login"
        variant="outlined"
        color="error"
        component={Link}
        fullWidth
        sx={{ marginTop: 'auto' }} // Pushes button to the bottom of the sidebar
      >
        Logout
      </Button>
      <Upgrade />
    </Box>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          {sidebarContent}
          {logoutButton}
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      {sidebarContent}
      {logoutButton}
    </Drawer>
  );
};

export default MSidebar;
