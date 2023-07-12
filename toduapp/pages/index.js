import Head from 'next/head'
import { useEffect, useState } from 'react'

//COMPONENTS
import ToduList from '../component/TodoList'
const fs = require('fs');

//REACT ICONS
import {AiOutlinePlus} from 'react-icons/ai'

//REACT SPINNER
import {CircleLoader} from 'react-spinners'
import { Button, Modal } from 'react-bootstrap';

export default function Home({tasks}) {
  //STATE HOOK
  const [fetchData,setfetchData]  = useState()
  const [show, setShow] = useState(false);
  const [data,setdata]=useState({
    text:"",
    warning:""
  })
  
  
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
  // HANDLE SHOW
  const handleShow = () => {setShow(true)};

  //HANDLE CLOSE
  const handleClose = () => {
    setShow(false)
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    const {target} = e
    setdata(prev=>({
      ...prev,
      text:target.value
    }))
  };


  // HANDLE DELETE
  const handleDelete = (id) => {
      (async()=>{
        await fetch('/api/delete-data', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(id)
       })
         .then((response) => response.json())
         .then((data) => setfetchData(data))
         .catch((error) => console.error(error));
     }
     )()
      setShow(false)
  };

  // HANDLE EDIT
  const handleEdit = (id,data) => {
    if(data){
      (async()=>{
        await fetch('/api/edit-data', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({id,data})
       })
         .then((response) => response.json())
         .then((data) => setfetchData(data))
         .catch((error) => console.error(error));
     }
     )()
      setShow(false)
    }else{
      setdata(prev=>({
        ...prev,
        warning:"input required text"
      }))
    }
  };

  // HANDLE MODAL
  const handleModal = () => {
      (async()=>{
        await fetch('/api/write-data', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data.text)
       })
         .then((response) => response.json())
         .then((data) => {
          setfetchData(data)
          setdata({
            text:"",
            warning:""
          })
         })
         .catch((error) => console.error(error));
     }
     )()
      setShow(false)
  };
  
  return (
    <>
      <Head>
        <title>Simple todu Next App</title>
        <meta name="description" content="Simple TudoApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{minHeight:"calc(90vh)"}}>
          <div>
            <h1 className='fw-bold text-center fst-italic text-primary-emphasis mt-3'>ToduList App</h1>

            <div className= 'ps-sm-5 d-flex justify-content-center my-2 container-md'>
              {fetchData ? < div className='w-100 '>
                <table className="table ms-lg-5 rounded-3">
                  <thead className='thead-light'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">TASKS</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchData.map((e,index)=>{
                return <ToduList key={index} index={index} handleDelete={handleDelete} handleEdit={handleEdit} id={e.id} text = {e.text}/>})}
                  </tbody>
                </table>
              </ div>
              :<div className=''><CircleLoader/></div>}
              </div>
            
            {/* BUTTON */}
            <div className='d-flex mt-2 container-md justify-content-center '>
            <Button variant="primary" onClick={handleShow}>
              Add new Task <AiOutlinePlus color='white' size={20}/>
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div className=' text-center text-danger'>{data.warning}</div>
                  <input value={data.text} onChange={handleChange} className='w-100 rounded-2 border-1' style={{height:"2rem"}}/>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleModal}>
                  Save Task
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
          </div>
      </main>
    </>
  )
}
