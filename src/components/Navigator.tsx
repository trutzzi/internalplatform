import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  AppBar, Box, Toolbar, Menu, Container, Avatar, Button, Tooltip, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignout } from '../hooks/useSignout';

type Pages = typeof ADMIN_LINKS | typeof GUEST_LINKS | typeof EMPLOYEE_LINKS;

const TITLE = 'PLATFORM';

export const ALLLINKS = {
  CREATE_TASK: {
    title: 'Create Task',
    href: 'create-task',
  },
  ALL_TASKS: {
    title: 'All tasks',
    href: 'all-tasks',
  },
  TASKS: {
    title: 'My Tasks',
    href: 'my-tasks',
  },
  EMPLOYEE: {
    title: 'My Employee',
    href: 'my-employee',
  },
  LOGIN: {
    title: 'Login',
    href: 'signin',
  },
  SIGNUP: {
    title: 'Signup',
    href: 'signup',
  },
};
const ADMIN_LINKS = [ALLLINKS.CREATE_TASK, ALLLINKS.ALL_TASKS, ALLLINKS.TASKS, ALLLINKS.EMPLOYEE];
const EMPLOYEE_LINKS = [ALLLINKS.TASKS];
const GUEST_LINKS = [ALLLINKS.LOGIN, ALLLINKS.SIGNUP];

export function Navigator() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, authIsReady } = useAuthContext();
  const [pages, setPages] = useState<Pages>([]);
  const { logout } = useSignout();
  const userMenu = [{ text: 'Logout', action: logout }];

  document.title = TITLE;

  useEffect(() => {
    // Add or remove link navigation based on login logic
    const isAdmin = user?.admin;
    const isLoggedIn = authIsReady;
    if (isLoggedIn) {
      if (isAdmin) {
        setPages(ADMIN_LINKS);
      } else {
        setPages(EMPLOYEE_LINKS);
      }
    } else {
      setPages(GUEST_LINKS);
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
      links.push(
        <Link style={{ textDecoration: 'none' }} key={page} to={`/${pages[page].href}`}>
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{pages[page].title}</Typography>
          </MenuItem>
        </Link>,
      );
    }
    return links;
  };

  const renderDesktopNav = () => {
    const links = [];
    for (const page in pages) {
      links.push(<Link style={{ textDecoration: 'none' }} key={page} to={`/${pages[page].href}`}>
        <Button
          variant="text"
          color="secondary"
          key={page}
          onClick={handleCloseNavMenu}
        >
          {pages[page].title}
        </Button>
      </Link>);
    }
    return links;
  };
  return (
    <AppBar style={{ marginBottom: '50px' }} position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            color="secondary"
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {TITLE}
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
            color="white"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {TITLE}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderDesktopNav()}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open user menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar style={{ marginRight: '5px' }} alt={user?.displayName || ''} src="feature" />
                  <Typography color="secondary" style={{ textTransform: 'uppercase' }} variant="h6">{user.displayName}</Typography>
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
                {userMenu.map(({ text, action }) => (
                  <MenuItem
                    key={text}
                    onClick={() => {
                      action();
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigator;
