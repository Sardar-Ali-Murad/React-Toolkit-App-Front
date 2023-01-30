import FormRow from '../components/FormRow'
import React from 'react'
import Alert from "../components/Alert"
import {  useResetPasswordMutation}  from "../services/Api"
import { seeAlert,removeAlert,actionBegin } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

import { useLocation} from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResetPassword = () => {
  let [resetPassword,setResetPassword]=React.useState("")
  const query = useQuery();
  let token=query.get('token')
  let email=query.get('email')

  const props = useSelector((state) => state.counter)
  let dispatch=useDispatch()
     
    let [trigger]=useResetPasswordMutation()
    const submit=async ()=>{
      dispatch(actionBegin())
      let {data,error,isLoading}=await trigger({email,token,password:resetPassword})
      if(data){
        dispatch(seeAlert({alertText:"Password Updated Successfully",alertType:"success"}))
     }
     if(error){
       dispatch(seeAlert({alertText:error.data.msg,alertType:"danger"}))
     }
     setTimeout(()=>{
       dispatch(removeAlert())
     },3000)
    }

    
  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>       
    <div>
     {props.showAlert && <Alert/>}
     {props.isLoading && <h1 className='label div-center' style={{color:"black"}}>Loading...</h1>}

      <FormRow name="password" labelText="Reset Password" value={resetPassword} handleChange={(e)=>setResetPassword(e.target.value)} placeholder="Enter Your New Password"/>
       <button className='btn' onClick={submit} >Submit</button>
       </div>
     </div>
  )
}

export default ResetPassword


