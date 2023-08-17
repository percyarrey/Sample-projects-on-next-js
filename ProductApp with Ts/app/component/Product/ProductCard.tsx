'use client'
import React, { useEffect } from 'react'
//MUI
import { Box,Button,Container,Grid, Typography } from '@mui/material'
//CUSTOM STYLE
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-toastify'
import Image from 'next/image';

export default function ProductCard({data}:{data:any}) {
    const router = useRouter()
    
    //HANDLE DELETE
    const handleDelete =async ()=>{
      await axios.delete(`/api/crudproduct?id=${data.productname}`)
      .then((res)=>{
        console.log(res.data)
        if(res.data.message==='Product Deleted Successfully'){
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setTimeout(() => {
            router.refresh()
          }, 1990);
        }else{
          toast.warn('Product Delete Failed !', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
        return;
      })
      .catch((e)=>{
        toast.error('Something went wrong Try again!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      })
      
    }
  return (
    <>
        {
          data!==undefined?
          <Box maxHeight={'45vh'} width={'100vw'} overflow={'hidden'} padding={'2vh'} display={'flex'} justifyContent={'center'}>
        <Grid className='myCard'  width={'90vw'} container spacing={1} boxShadow={10} height={'100%'}>
          <Grid item xs={6} display={'flex'} justifyContent={'center'} height={'100%'} md={5} overflow={'hidden'} lg={5}>
            <Image src={data.image} height={300} width={300} alt={data.productname}/>
          </Grid>
          <Grid item xs={5}  height={'43vh'} md={6} lg={6}>
            <Box  height={'100%'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'}>
              <div>
                  <Box display={'flex'}>
                <Typography  component="div" fontWeight={600}>
                  Name: 
                </Typography>
                <Typography  component="div" fontWeight={300}>
                  {data.productname}
                </Typography>
              </Box>
              <Box display={'flex'}>
                <Typography  component="div" fontWeight={400}>
                  Category:
                </Typography>
                <Typography  component="div" fontWeight={200}>
                  {data.category}
                </Typography>
              </Box>
              <Box display={'flex'}>
              <Typography  component="div" fontWeight={900}>
                  Price:
                  </Typography>
                  <Typography  component="div" fontWeight={600}>
                  {data.price} frs
                  </Typography>
              </Box>
              <Box display={'flex'}>
              <Typography  component="div" fontWeight={200}>
                  Description:
                  </Typography>
                  <Typography  component="div" fontWeight={100}>
                  {data.description}
                  </Typography>
              </Box>
              </div>
              <Box justifyContent={"space-between"} display={'flex'}>
                <Button color='primary' variant='contained'  style={{backgroundColor:'#0E9AFC'}} onClick={()=>{router.push(`/product/${data._id}`)}}>
                  Edit
                </Button>
                <Button variant='contained'  style={{backgroundColor:'red'}}  onClick={handleDelete} color='error'>
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </Box>:
      <div>Your have no Product avialable</div>
        }
    </>
  )
}
