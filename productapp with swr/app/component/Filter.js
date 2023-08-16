'use client'
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import { Grid, Typography } from '@mui/material';

//NEXT NAVIGATION
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
export default function    Filter() {
  //NEXT ROUTER
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  //SEARCH FUNCTIONALITY
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box paddingX={2} marginY={0}>
      <TriggerButton type="button" onClick={handleOpen}>
        Select Category {'>'}
      </TriggerButton>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <Typography variant='h5' fontWeight={700}>Popular Categories</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} >
              <Box padding={1} onClick={()=>{router.push('/'); setOpen(false)}} style={{cursor:'pointer'}} height={'100%'} display={'flex'} border={1} borderRadius={2} gap={3} width={'100%'}>
                  <Box>
                    <img src={'./all.jpg'} width={'100'} height={'100%'}/>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} variant='h6'>All Items</Typography><br/>
                    <Typography color={'gray'}>NaN items avialable</Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box padding={1} onClick={()=>{router.push('/' + '?' + createQueryString('query','c:' + 'laptop')); setOpen(false)}} style={{cursor:'pointer'}} height={'100%'} display={'flex'} border={1} borderRadius={2} gap={3} width={'100%'}>
                  <Box>
                    <img src={'./laptop.jpg'} width={'100'} height={'100%'}/>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} variant='h6'>Laptops </Typography><br/>
                    <Typography color={'gray'}>NaN items avialable</Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box padding={1} onClick={()=>{router.push('/' + '?' + createQueryString('query','c:' + 'gaming')); setOpen(false)}} style={{cursor:'pointer'}} height={'100%'} display={'flex'} border={1} borderRadius={2} gap={3} width={'100%'}>
                  <Box>
                    <img src={'./Gconsole.jpg'} width={'100'} height={'100%'}/>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} variant='h6'>Gaming</Typography><br/>
                    <Typography color={'gray'}>NaN items avialable</Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={6} style={{cursor:'pionter'}}>
              <Box onClick={()=>{router.push('/' + '?' + createQueryString('query','c:' + 'television')); setOpen(false)}} style={{cursor:'pointer'}} height={'100%'} padding={1} color={'bg.gray'} display={'flex'} border={1} borderRadius={2} gap={3} width={'100%'}>
                  <Box>
                    <img src={'./tv.jpg'} width={'100'} height={'100%'}/>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} variant='h6'>Televisions</Typography><br/>
                    <Typography color={'gray'}>NaN items avialable</Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={6} style={{cursor:'pionter'}}>
              <Box onClick={()=>{router.push('/' + '?' + createQueryString('query','c:' + 'acessories')); setOpen(false)}} style={{cursor:'pointer'}} height={'100%'} padding={1} color={'bg.gray'} display={'flex'} border={1} borderRadius={2} gap={3} width={'100%'}>
                  <Box>
                    <img src={'./accesories.jpg'} width={'100'} height={'100%'}/>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} variant='h6'>Accesories</Typography><br/>
                    <Typography color={'gray'}>NaN items avialable</Typography>
                  </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledModal>
    </Box>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: '97vw',
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);
