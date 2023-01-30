import FormRow from '../components/FormRow'
import React from 'react'
import {  useForgetPasswordMutation}  from "../services/Api"
import { seeAlert,removeAlert,actionBegin } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Alert from "../components/Alert"
const ForgetPassword = () => {
        let [email,setEmail]=React.useState("")
        const props = useSelector((state) => state.counter)
      let dispatch=useDispatch()
         
        let [trigger]=useForgetPasswordMutation()
        const submit=async ()=>{
          dispatch(actionBegin())
          let {data,error,isLoading}=await trigger({email})
          if(data){
            dispatch(seeAlert({alertText:"We have send you a link to reset password",alertType:"success"}))
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
      <FormRow name="email" labelText="Enter Your Email To Continue" value={email} handleChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"/>
       <button onClick={submit} className="btn">Submit</button>
       </div>
     </div>
  )
}

export default ForgetPassword


