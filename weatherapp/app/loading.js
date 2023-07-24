import {ClipLoader} from 'react-spinners'

const Loading=()=>{
    return <div className=' min-h-[90vh] flex justify-center items-center'>
        <ClipLoader size={100} color='blue'/>
    </div>
}
export default Loading;