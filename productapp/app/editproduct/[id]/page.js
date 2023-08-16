//CUSTOM STYLE
import styles from '../../page.module.css'
//MUI
import { Box,Button,Container,Grid, Typography } from '@mui/material'
import { MoonLoader } from 'react-spinners'

//COMPONENT
import Editproductcomp from '@/app/component/Editproductcomp'
import MenuCard from '@/app/component/MenuCard'


export default async function page({params}) {
  const data = await fetch(`http://localhost:3000/api/crudproduct`)
  .then((res)=>res.json())
  .then(res=>{
    return res.data
  })
  .catch((e)=>{
    console.log(e)
    return undefined
  })
  var datadetail = (data.filter(e=>e._id===params.id))[0]
  if(datadetail===undefined){
    datadetail = data[0]
  }
  return (
    <div style={{maxWidth:'100vw',overflow:'hidden'}}>
      {
        data!==undefined?<Editproductcomp data={datadetail}/>:
        <Box display={'flex'} minHeight={'45vh'} justifyContent={'center'} alignItems={'center'}>
          <MoonLoader size={50}/>
        </Box>
        
      }

      <Container>
        <Typography variant='h5' gutterBottom color={'primary'}>Related Products</Typography>
        {
          data!=undefined?
          <Grid container spacing={2}>
            {data.map((k,index)=>{
              return <MenuCard key={index} productname={k.productname} category={k.category} id={k._id} image={k.image} price={k.price} description={k.description}/>
              })
            }
          </Grid>:
          <Box display={'flex'} minHeight={'45vh'} justifyContent={'center'} alignItems={'center'}>
          <MoonLoader size={50}/>
        </Box>
        }
      </Container>

    </div>
  )
}
