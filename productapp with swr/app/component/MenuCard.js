'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import styles from '../page.module.css'

//NAVIGATION
import { useRouter } from 'next/navigation';

export default function MenuCard(props) {
  const router = useRouter()
  React.useEffect(()=>{
    router.refresh()
  },[])
  var txt = props.productname
  if(txt.length>15){
    txt = txt.slice(0,15)
    txt = txt + "..."
  }
  return (
    <Grid item xs={6} sm={4} md={3} lg={3}>
      <Card className={styles.myhover} onClick={()=>router.push(`/editproduct/${props.id}`)}  style={{cursor:'pointer',Width:'100%',height:'100%'}}>
      <div style={{height:'140', width:'100%',overflow:'hidden'}}>
        <CardMedia
          component="img"
          alt={props.productname}
          height="140"     
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
        <Button variant='contained' color='primary' size="small" >Add Cart</Button>
      </CardActions>
      </div>
      </Card>
    </Grid>
  );
}
