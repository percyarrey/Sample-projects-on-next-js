import { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

//COMPONENT
import EditModal from './EditModal';
  const ToduList =(props)=>{
  const [data,setdata]=useState({
    text:props.text,
    warning:""
  })
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
       .then((data) => props.fetchDatafxn())
       .catch((error) => console.error(error));
   }
   )()
  };

  // HANDLE EDIT
  const handleEdit = (id,data) => {
    (async()=>{
      await fetch('/api/edit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id,data})
      })
        .then((response) => response.json())
        .then((data) => props.fetchDatafxn())
        .catch((error) => console.error(error));
    }
    )()
  };
    return(
      < div className='w-100 '>
                <table className="table ms-lg-5 rounded-3">
                  <thead className='thead-light'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">TASKS</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.fetchData.map((e,index)=>{
                return (
                <tr key={index} index={index}>
                    <th scope="row">{index +1}</th>
                    <td>{e.text}</td>
                    <td><div className="d-flex gap-5">
                    <EditModal  id={e.id} text = {e.text} handleDelete={handleDelete} handleEdit={handleEdit} handleChange={handleChange}/>
                    </div></td>
                </tr>
                )})}
                  </tbody>
                </table>
      </ div>
    )
}

export default ToduList 