'use client'
import React from 'react'
import Cards from '../component/Cards'
import { Typography,Box,Container,Grid } from '@mui/material'
import ProductCard from '@/app/component/Product/ProductCard'

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const {id} = searchParams
  const data = await fetch(`http://localhost:3000/api/crudproduct`)
  .then((res)=>res.json())
  .then(res=>{
    return res.data
  })
  .catch((e)=>{
    console.log(e)
    return undefined
    
  })
  var datadetail = (data.filter((e : any)=>e._id===id))[0]
  if(datadetail===undefined){
    datadetail = data[0]
  }
  return (
    <div className='px-5'>
      <div style={{maxWidth:'100vw',overflow:'hidden'}}>
      {
        data!==undefined?<ProductCard data={datadetail}/>:
        <Box display={'flex'}  className='px-5' minHeight={'45vh'} justifyContent={'center'} alignItems={'center'}>
          <p>loading</p>
        </Box>
        
      }

      <Container>
        <Typography variant='h5' gutterBottom color={'primary'}>Related Products</Typography>
        {
          data!=undefined?
          <Grid container spacing={2}>
            {data.map((k : any,index : number)=>{
              return <Cards key={index} productname={k.productname} category={k.category} id={k._id} image={k.image} price={k.price} description={k.description}/>
              })
            }
          </Grid>:
          <Box display={'flex'} minHeight={'45vh'} justifyContent={'center'} alignItems={'center'} className='px-5'>
            Loading
        </Box>
        }
      </Container>

    </div>
    </div>
  )
}
