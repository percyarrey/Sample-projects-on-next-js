'use client'
import React, { useEffect, useCallback } from 'react'

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddProductIcon from '@mui/icons-material/add';
import NotificationsIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreVert';

import Link from 'next/link';
import { Tooltip } from '@mui/material';


//NEXT NAVIGATION
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  
  borderRadius: 15,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function Header() {
  useEffect(()=>{
    /* console.clear() */
  })

  //NEXT ROUTER
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isActive = (path) =>{
    return pathname.slice(0,12) === path;
    
  }
  //SEARCH FUNCTIONALITY
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const handleSearch=(e)=>{
    if(e.key==='Enter'){
      router.push('/' + '?' + createQueryString('query','s:' + e.target.value))
    }
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem style={{display:`${isActive('/editproduct')||isActive('/addproduct')?'flex':'none'}`}}>
          <Link href={'/addproduct'} style={{display:'flex',textDecoration:'none',color:'black'}}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            ><AddProductIcon />
            </IconButton>
            <p>Add Product</p>
          </Link>
      </MenuItem>
      <MenuItem style={{display:`${isActive('/editproduct') || isActive('/addproduct')?'none':'flex'}`}}>
          <Link href={'/cart'} style={{display:'flex',textDecoration:'none',color:'black'}}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Cart</p>
          </Link>
      </MenuItem>
      <MenuItem>
        <Link href={'/editproduct/123'} style={{display:'flex',textDecoration:'none',color:'black'}}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          ><NotificationsIcon />
          </IconButton>
          <p>Edit Product</p>
          </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  color={'transparent'}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            color={'primary'}
            fontSize={20}
            fontWeight={1000}
            fontFamily={'Helvetica'}
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Product App
          </Typography>
          <Search onKeyDown={handleSearch}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link href={'/cart'} style={{display:'flex',textDecoration:'none',color:'black'}}>
            <Tooltip title='Cart' style={{display:`${isActive('/editproduct')||isActive('/addproduct')?'none':'flex'}`}}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
            
          <Link href={'/addproduct'} style={{display:'flex',textDecoration:'none',color:'black'}}>
            <Tooltip title='Add Product' style={{display:`${isActive('/editproduct')||isActive('/addproduct')?'flex':'none'}`}}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <AddProductIcon />
              </IconButton>
            </Tooltip>
          </Link>
            
          <Link href={'/editproduct/123'} style={{display:'flex',textDecoration:'none',color:'black'}}>
            <Tooltip title='Edit Product'>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              ><NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Link>
           
          <Tooltip title='Profile'>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
            
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Link href="/"  style={{display:`${isActive('/')?'none':'block'}`,color:'darkblue',textDecoration:'none',marginLeft:10}}> <Typography>Return Home</Typography></Link>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </>
  );
}
