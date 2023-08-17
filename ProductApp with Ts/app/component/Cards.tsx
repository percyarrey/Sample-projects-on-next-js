'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
//SWR
/* import useSWR from 'swr'
import fetcher from '@/utils/Fetcher' */

//NAVIGATION
import { useRouter } from 'next/navigation';
//INTERFACES
interface Cards{
  productname:string;
  id:string;
  image:string;
  category:string;
  price:number;
  description:string;
}

export default function Cards(props : Cards) {
  const router = useRouter()
  var txt : string = props.productname
  if(txt.length>15){
    txt = txt.slice(0,15)
    txt = txt + "..."
  }
  return (
    <Grid item xs={6} sm={6} md={3} lg={3}>
      <Card className='myCard' onClick={()=>router.push(`/product?id=${props.id}`)}  style={{cursor:'pointer',height:'100%'}}>
      <div style={{height:'140', width:'100%',overflow:'hidden'}}>
        <CardMedia
          component="img"
          alt={props.productname}
          height="140px"     
          image={props.image}
        />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
      <CardContent>
        <Typography variant="h5" component="div" fontWeight={600}>
          {txt}
        </Typography>
        <Typography variant="h6" component="div" fontWeight={400}>
          {props.category}
        </Typography>
        <Typography variant="h6" component="div" fontWeight={900}>
          {props.price} frs
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined' color='warning' size="small">view Details</Button>
        <Button color='primary' style={{backgroundColor:'#0E9AFC'}} variant='contained' size="small" >Add Cart</Button>
      </CardActions>
      </div>
      </Card>
    </Grid>
  );
}
