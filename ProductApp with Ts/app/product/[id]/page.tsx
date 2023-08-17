import ProductDetails from '@/app/component/Product/ProductDetails'
import { Box } from '@mui/material'
import React from 'react'

export default async function page({
  params,
  searchParams,
}: {
  params: any ,
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const id = params?.id
  var data = await fetch(`http://localhost:3000/api/crudproduct`)
  .then((res)=>res.json())
  .then(res=>{
    return res.data
  })
  .catch((e)=>{
    console.error(e)
    return undefined
  })
  var data = (data.filter((e : any)=>e._id===id))[0]
  return (
    <div className='px-5' style={{maxWidth:'100vw',overflow:'hidden'}}>
      {
         data!==undefined?
        <ProductDetails datar={data}/>:
        <Box display={'flex'} minHeight={'45vh'} justifyContent={'center'} alignItems={'center'}>
          <div>
                You have no product slected
          </div>
        </Box>
      }
    </div>
  )
}
