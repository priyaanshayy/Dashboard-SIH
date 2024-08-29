import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import Profile from './Profile';
import Notifications from './Notifications';
import { IconBellRinging, IconMenu, IconSearch } from '@tabler/icons-react';

const Header = (props) => {

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Notifications />

        <Box flexGrow={1} />

        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            width: '200px',
            marginRight: '16px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch width="20" height="20" />
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
