import { Box, Container, Grid } from '@mui/material';
import MenuCard from './component/MenuCard'
export default async function Home({searchParams}) {
  const {query} = searchParams
  const data = await fetch(`http://localhost:3000/api/crudproduct?query=${query}`)
  .then((res)=>res.json())
  .then(res=>{
    return res.data
  })
  .catch((e)=>{
    console.log(e)
    return e
  })
  return (
    <div style={{justifyContent:'center',display:'flex',width:'100vw'}}>
      {
        data!=undefined?
        <Box width={'100vw'} paddingX={2}>
          <Grid container spacing={2}>
            {data.map((k,index)=>{
              return <MenuCard  id={k._id} key={index} productname={k.productname} category={k.category} image={k.image} price={k.price} description={k.description}/>
              })
            }
          </Grid>
        </Box>:
        <div style={{display:'flex',minHeight:'100vh',justifyContent:'center',alignItems:'center'}}>
          <div>Connection Problem Reload the page</div>
        </div>
      }
    </div>
 );
}