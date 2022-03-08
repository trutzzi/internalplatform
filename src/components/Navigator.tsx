import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AppBar, Box, Toolbar, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignout } from '../hooks/useSignout';

type UserRoleCase = 'GUEST' | 'ADMIN' | 'EMPLOYEE';
const title = 'Platform'

const PAGES = {
  CREATE_TASK: {
    title: 'Create Task',
    href: 'Create'
  },
  ALL_TASKS: {
    title: 'All tasks',
    href: 'AllTasks'
  },
  TASKS: {
    title: 'My Tasks',
    href: 'Tasks'
  },
  EMPLOYEE: {
    title: 'My Employee',
    href: 'Employee'
  },
  LOGIN: {
    title: 'Login',
    href: 'Login'
  },
  SIGNUP: {
    title: 'Signup',
    href: 'Signup'
  }
};

const getPageByRole = (role: UserRoleCase) => {
  const { CREATE_TASK, ALL_TASKS, TASKS, EMPLOYEE, LOGIN, SIGNUP } = PAGES;
  switch (role) {
    case 'ADMIN':
      return [CREATE_TASK, ALL_TASKS, TASKS, EMPLOYEE];
    case 'EMPLOYEE':
      return [TASKS];
    case 'GUEST':
      return [LOGIN, SIGNUP];
  }
};

export const Navigator = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, authIsReady } = useAuthContext();
  const [pages, setPages] = useState<any>(null);
  const { logout } = useSignout();
  const userMenu = [{ title: 'Logout', action: logout }];

  document.title = title;

  useEffect(() => {
    // Add or remove options based on login logic
    if (authIsReady) {
      if (user?.admin) {
        setPages(getPageByRole('ADMIN'))
      } else {
        setPages(getPageByRole('EMPLOYEE'))
      }
    } else {
      setPages(getPageByRole('GUEST'))
    }
  }, [authIsReady, user]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const renderMobileNav = () => {
    const links = [];
    for (const page in pages) {
      console.log(pages[page])
      links.push(
        <Link style={{ textDecoration: 'none', color: 'black' }} key={page} to={`/${page}`}>
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{pages[page].title}</Typography>
          </MenuItem>
        </Link>
      )
    }
    return links;
  }

  const renderDesktopNav = () => {
    const links = [];
    for (const page in pages) {
      links.push(<Link key={page} to={`/${pages[page].href}`}><Button
        style={{ color: 'white', textDecoration: 'none' }}
        key={page}
        onClick={handleCloseNavMenu}
      >
        {pages[page].title}
      </Button>
      </Link>)
    }
    return links;
  }
  return (
    <AppBar style={{ marginBottom: '50px' }} position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            color='white'
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderMobileNav()}
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            color='white'
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderDesktopNav()}
          </Box>

          {user && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar style={{ marginRight: '5px' }} alt={user.displayName} src={'feature'} />
                <Typography color="white" variant='h5'>{user.displayName}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenu.map(({ title, action }) => (
                <MenuItem key={title} onClick={() => {
                  action()
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigator;
