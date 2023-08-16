import { Box } from '@mui/material';
import {ClipLoader} from 'react-spinners'

const Loading=()=>{
    return <div  style={{display:'flex',minHeight:'90vh',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
        <ClipLoader size={100} color='blue'/>
    </div>
}
export default Loading;