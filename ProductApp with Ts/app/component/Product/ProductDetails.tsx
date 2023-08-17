'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {ImagetoBase64} from '@/utils/ImagetoBase64'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Typography } from '@mui/material'
import CloudUpload from '@mui/icons-material/CloudUpload'
import {MoonLoader} from 'react-spinners'
import { useParams,useRouter } from 'next/navigation'
import axios from 'axios'

export default function ProductDetails({datar}:{datar:any}) {
    useEffect(()=>{
        console.clear()
      },[])
      const router = useRouter()
      if(datar ===undefined){
        router.push(`/`)
      }
        
      const [data,setdata]=React.useState({
        productname: datar.productname,
        category:datar.category,
        image:datar.image,
        price:datar.price,
        description:datar.description
      })
      //REACT HOOK DECLARATION
      const [saveSpinner,setSaveSpinner]=React.useState(false)
      
      const [warning,setWarning]=React.useState("")
      //HANDLE DATA
      const handledata=(e:any)=>{
        const{name,value}=e.target
        setdata((prev)=>{
          return{
              ...prev,
              [name]:value
          }
        })
      }
      //HANDLE IMAGES
      const handleprofileimage= async(e : any)=>{
        const data = await ImagetoBase64(e.target.files[0])
        const{name}=e.target
        setdata((prev)=>{
          return{
              ...prev,
              [name]:data
          }
        })
      }
      //HANDLE SUBMIT
      const handleSubmit =async(e : any)=>{
        e.preventDefault()
        const {productname,category, image, price, description}=data
        if(!saveSpinner){
          if(productname && image&& price && description){
            if(category){
              if(price>0){
                setSaveSpinner(true)
                const dataRes = await axios.put("/api/crudproduct", data)
                .then((res)=>{
                  setSaveSpinner(false)
                  return res.data
                })
                .catch((e)=>{
                  setSaveSpinner(false)
                  if(e.response!==undefined){
                    return e.response.data
                  }else{
                    return e
                  }
                })
                if(dataRes.message=="Product upload Failed"){
                  setWarning("Product upload Failed")
                  toast.warn("Product upload Failed", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    });
                  
                }else if(dataRes.message=="Product Successfully Updated"){
                    setdata(dataRes.data)
                    toast.success(dataRes.message, {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light',
                      });
                    setWarning("")
                  }else{
                    console.log(dataRes.message)
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
                }
              }else{
                setWarning("Enter an appropriate price")
                toast.warn("Enter an appropriate price", {
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
              }
            else{
              setWarning("Select a Category")
              toast.warn("Select a Category", {
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
          }else{
            setWarning("Please enter required fields")
            toast.warn("Please enter required fields", {
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
      }}
      //SELECT CATEGORY
  const currencies = [
    {
      value: 'Laptop',
      label: 'Laptop',
    },
    {
      value: 'Gaming Console',
      label: 'Gaming Console',
    },
    {
      value: 'Television',
      label: 'Television',
    },
    {
      value: 'Acessories',
      label: 'Acessories',
    },
  ];
    
  return (
    <>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Box boxShadow={10} borderRadius={1} style={{maxWidth:"30rem",width:'100%',paddingLeft:"1rem",paddingRight:"1rem",paddingBottom:"1.2rem",backgroundColor:"white"}}>
        <form onSubmit={handleSubmit} style={{marginTop:'1rem'}}>
        <div style={{textAlign:'center',color:'red'}}>{warning}</div>
          {/* PRODUCT NAME */}
          <Box borderRadius={1}  marginBottom={2}>
            <TextField
              autoComplete='off'
              fullWidth
              id="outlined-textarea"
              label="Product Name"
              placeholder="e.g ps5"
              name='productname'
              onChange={handledata} 
              value={data.productname}
            />
          </Box >
          {/* CATEGORY */}
          <Box borderRadius={1} marginBottom={2}>
            <TextField
              id="outlined-select-currency"
              name="category"
              select
              fullWidth
              label="Select Category"
              defaultValue="none"
              onChange={handledata} 
              value={data.category}
              
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* IMAGE */}
          <label htmlFor="image">
            <Box boxShadow={1} overflow={'hidden'} borderRadius={2} style={{height:"10rem",cursor:"pointer",width:'100%',display:'flex',justifyContent:'center',alignItems:'center', border:'1px solid gray'}}>{data.image ? <img height="100%" src={data.image}/> :<div>
              <div style={{justifyContent:'center',opacity:'0.5',display:'flex'}}><CloudUpload/></div>
              <Typography color={'text.secondary'}>Upload an Image</Typography>
              </div>}
            </Box>
          </label>
          <input accept='image/*' type="file" style={{height:"0rem"}} className="w-100 bg-light rounded-1 border-1" name="image" id="image" placeholder=""  onChange={handleprofileimage}/>

          {/* PRICE*/}
          <Box borderRadius={1} marginBottom={2}>
            
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                type="number"
                name="price"
                fullWidth
                onChange={handledata} 
                value={data.price}
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">frs</InputAdornment>}
                label="Amount"
              />
            </FormControl>
          </Box>

          {/* DESCRIPTION */}
          <Box boxShadow={1} borderRadius={1} marginBottom={2}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              fullWidth
              multiline
              rows={4}
              defaultValue=""
              name='description'  
              onChange={handledata} 
              value={data.description}
            />
          </Box>
          

          {/* SAVE */}
          <Box borderRadius={1} marginBottom={2} boxShadow={2}>
            <Button variant='contained' type='submit' color='warning' fullWidth>
              {saveSpinner?<MoonLoader color='white' size={20}/>:"Save Edit"}
            </Button>
          </Box>
          
        </form>
      </Box>
      </div>
    </>
  )
}
