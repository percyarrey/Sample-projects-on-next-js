import React, { useState } from 'react'

//BOOTSTRAP
import { Button, Modal } from 'react-bootstrap';

//REACT ICONS
import {AiOutlinePlus} from 'react-icons/ai'

export default function SaveModal(props) {
  //STATE HOOK
  const [show, setShow] = useState(false);
  const [data,setdata]=useState({
    text:"",
    warning:""
  })
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
  
  
  
    // HANDLE MODAL
    const handleModal = () => {
       if(data.text){
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
            props.fetchDatafxn()
            setdata({
              text:"",
              warning:""
            })
           })
           .catch((error) => console.error(error));
        }
        )()
          setShow(false)
       }else{
        setdata(prev=>({
          ...prev,
          warning:"Input required field"
        }))
       }
    };
    
  return (
    <>
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
          <input value={data.text}  onChange={handleChange} className='w-100 bg-white rounded-2 border-1 text-black' style={{height:"2rem"}}/>
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
    </>
  )
}
