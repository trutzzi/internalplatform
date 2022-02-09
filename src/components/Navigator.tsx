import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AppBar, Box, Toolbar, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignout } from '../hooks/useSignout';


const title = 'Platform'
const defaultPages: string[] = [];

export const Navigator = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user, authIsReady } = useAuthContext();
  const [pages, setPages] = React.useState(defaultPages);
  const { logout } = useSignout();
  const userMenu = [{ title: 'Logout', action: logout }];

  document.title = title;

  React.useEffect(() => {
    // Add or remove options based on login logic
    if (authIsReady) {
      if (user) {
        if (user.admin) {
          setPages([...defaultPages, 'Create', 'AllTasks', 'Tasks', 'Employee'])
        } else {
          setPages([...defaultPages, 'Tasks'])
        }
      } else {
        setPages([...defaultPages, 'Login', 'Signup'])
      }
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
              {pages.map((page, key) => (
                <Link style={{ textDecoration: 'none', color: 'black' }} key={key} to={`/${page}`}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
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
            {pages.map((page, key) => (
              <Link key={key} to={`/${page}`}><Button
                style={{ color: 'white' }}
                key={page}
                onClick={handleCloseNavMenu}
              >
                {page}
              </Button>
              </Link>
            ))}
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
