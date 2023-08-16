import Head from 'next/head'
import { useEffect, useState } from 'react'

//COMPONENTS
import ToduList from '../component/TodoList'
const fs = require('fs');
import SaveModal from '@/component/SaveModal';

//REACT SPINNER
import {MoonLoader} from 'react-spinners'

//BOOTSTRAP
import { Button, Modal } from 'react-bootstrap';

export default function Home({tasks}) {
  const [fetchData,setfetchData]  = useState()
  
  useEffect(()=>{
    require('bootstrap/dist/js/bootstrap.min');
    (async()=>{
       await fetch('/api/read-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => setfetchData(data))
        .catch((error) => console.error(error));
    }
    )()
  },[])

  //ADD DATA
  function fetchDatafxn(){
    (async()=>{
      await fetch('/api/read-data', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       }
     })
       .then((response) => response.json())
       .then((data) => setfetchData(data))
       .catch((error) => console.error(error));
   }
   )()
  }
  return (
    <>
      <Head>
        <title>Simple todu Next App</title>
        <meta name="description" content="Simple TudoApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{minHeight:"calc(97vh)"}}>
          <div>
            <h1 className='fw-bold text-center fst-italic text-primary-emphasis mt-3'>ToduList App</h1>

            <div className= 'ps-sm-5 d-flex justify-content-center my-2 container-md'>
              {fetchData ? 
                <ToduList fetchDatafxn={fetchDatafxn} fetchData={fetchData}/>
              :<div><MoonLoader/></div>}
              </div>
            
            {/* BUTTON */}
            <div className='d-flex mt-2 container-md justify-content-center '>
      
              <SaveModal fetchDatafxn={fetchDatafxn} title="Add Task"/>

            </div>


          </div>
      </main>
    </>
  )
}
