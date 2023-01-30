
import React from 'react'
import Alert from './Alert'
import { useSelector ,useDispatch} from 'react-redux'
import {  useNewsLetterMutation}  from "../services/Api"
import {seeAlert,removeAlert}  from "../features/user/userSlice"
const NewLetter = () => {
    let dispatch=useDispatch()
  let {showAlert}=useSelector((state)=>state.counter)
  let [email,setEmail]=React.useState("")
   
  let [addEmail]=useNewsLetterMutation()
  const sub=async()=>{
    let {data,error}=await addEmail({email})
    if(data){
        dispatch(seeAlert({alertType:"success",alertText:"The email is added successfully"}))
    }
    if(error){
       dispatch( seeAlert({alertText:error.data.msg,alertType:"danger"}))
    }
    setTimeout(()=>{
        dispatch(removeAlert())
    },3000)
  }
  return (
    <div className='main-div-margins grid-17 div-center-80'>
        <div>
          {showAlert && <Alert/>}
          <h2>Join our newsletter and get 20% off</h2>
          <p className='label text-black' style={{color:'black'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
        </div>
        <div className='news-input'>
          <input placeholder='Ente Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='dark'/>
          <button className='btn p-[16px]'  style={{padding:"16px",}} onClick={sub} >Subscribe</button>
        </div>
    </div>
  )
}

export default NewLetter
