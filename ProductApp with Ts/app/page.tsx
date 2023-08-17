'use client'
import { Box, Container, Grid } from '@mui/material';
import Cards from './component/Cards';

import useSWR from 'swr'
import fetcher from '@/utils/Fetcher';


interface Product {
  _id: string;
  productname: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export default function Home() {
  
  const { data,isLoading, error } = useSWR<Product[]>('/api/crudproduct', fetcher);

  return (
    <div>
      {
        !isLoading?
        <div>
            {data !== undefined ? (
        <Box paddingX={2} paddingTop={4}>
          <Grid container spacing={2}>
            {data.map((k: any, index: number) => {
              return (
                <Cards
                  id={k._id}
                  key={index}
                  productname={k.productname}
                  category={k.category}
                  image={k.image}
                  price={k.price}
                  description={k.description}
                />
              );
            })}
          </Grid>
        </Box>
      ) : (
        <div style={{ display: 'flex', minHeight: '60vh', justifyContent: 'center', alignItems: 'center' }}>
          <div>Connection Problem Reload the page</div>
        </div>
      )}
        </div>:
        <div style={{ display: 'flex', minHeight: '60vh', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading</div>
      </div>
      }
    </div>
  );
}