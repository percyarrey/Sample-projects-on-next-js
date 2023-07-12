import { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';
//REACT ICONS
import {BsTrash} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
const ToduList =(props)=>{
    const [show, setShow] = useState(false);
    const [data,setdata]=useState({
        text:props.text,
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
    //HANDLE EDIT
    const handleEdit =()=>{
      if(data.text){
        props.handleEdit(props.id,data.text)
        setShow(false)
      }else{
        setdata(prev=>({
          ...prev,
          warning:"input required text"
        }))
      }
    }
//-------------------------------------------------------------
    //HANDLE DELETE
    const handleDelete =()=>{
    props.handleDelete(props.id)
    }

    return(
        <tr>
            <th scope="row">{props.index +1}</th>
            <td>{props.text}</td>
            <td><div className="d-flex gap-5">
            <span variant="primary" onClick={handleShow}>
                <AiOutlineEdit color='blue' size={22} style={{cursor:"pointer"}}/>
            </span>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
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
                <Button variant="primary"  onClick={handleEdit}>
                  Save change
                </Button>
              </Modal.Footer>
            </Modal>
                <BsTrash color='red' className='mt-1' cursor={"pointer"}  onClick={handleDelete}/>  </div></td>
        </tr>
    )
}

export default ToduList 