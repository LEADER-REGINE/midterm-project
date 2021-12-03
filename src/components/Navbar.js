import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import LoginModal from './LoginModal';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const style = {
    appBar: {
        backgroundColor: "#1E1F20",
    }
};

const links = [
    {
        to: '/',
        name: 'Student List'
    },
    {
        to: '/evaluation',
        name: 'Student Evaluation'
    },
    {
        to: '/blog',
        name: 'Blog'
    },
]




export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={style.appBar}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Student Review
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

                                {links.map(link => (
                                    <NavLink onClick={handleCloseNavMenu} to={link.to} style={{ textDecoration: 'none' }}>
                                        <MenuItem key={link.to} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" sx={{ my: 2, color: 'black', display: 'block' }}>{link.name}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                )
                                )}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            Student Review
                        </Typography>
                        <Box sx={{
                            flexGrow: 1, display: { xs: 'none', md: 'flex' },
                            alignContent: 'center', alignItems: 'center',
                            justifyContent: 'center', justifyItems: 'center'
                        }}>
                            {links.map(link => (
                                <NavLink 
                                    style={
                                        isActive => ({
                                        color: isActive ? "#26CE8D" : "#D1D4C9",
                                        borderTop: isActive ? '3px solid #26CE8D': '0px solid #26CE8D',
                                        textDecoration: 'none',
                                        margin: '20px',
                                       
                                        })} 
                                  onClick={handleCloseNavMenu} 
                                  to={link.to}  
                                  exact={true}
                                >
                                    {link.name}
                                    {/* <Button sx={{ my: 2, color: 'white', display: 'block' }} style={{ textDecoration: 'none' }}> {link.name} </Button> */}
                                </NavLink>)
                            )}
                        </Box>
                        <LoginModal />
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    );
}