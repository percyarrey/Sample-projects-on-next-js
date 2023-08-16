
import { Box} from '@mui/material'
import {MoonLoader} from 'react-spinners'
import Editproductdetailscomp from '@/app/component/Editproductdetailscomp'


export default async function page({params}) {
  var data = await fetch(`http://localhost:3000/api/crudproduct`)
  .then((res)=>res.json())
  .then(res=>{
    return res.data
  })
  .catch((e)=>{
    console.log(e)
    return undefined
  })
  var data = (data.filter(e=>e._id===params.id))[0]
  return (
    <div style={{maxWidth:'100vw',overflow:'hidden'}}>
      {
         data!==undefined?
        <Editproductdetailscomp datar={data}/>:
        <Box display={'flex'} minHeight={'45vh'} justifyContent={'center'} alignItems={'center'}>
          <div>
                You have no product slected
          </div>
        </Box>
      }
    </div>
    
  )
}
