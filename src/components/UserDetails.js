import React from 'react'
import FormRow from "../components/FormRow";
import Card from "@mui/material/Card";
import Alert from './Alert';
import { useSelector, useDispatch } from 'react-redux'
import {useUpdateUserMutation,useLogoutUserApiMutation,useUpdateUserPasswordMutation
}  from "../services/Api"
import {seeAlert,removeAlert,logoutUser }  from "../features/user/userSlice"
import { useNavigate } from 'react-router-dom';


const UserDetails = () => {
  const props = useSelector((state) => state.counter)
  let navigate=useNavigate()
  const dispatch = useDispatch()
  let [updateUser]=useUpdateUserMutation()
    let [password,setPassword]=React.useState("")
    let [confirmPassword,setConfirmPassword]=React.useState("")
    let alert=React.useRef()
    let [data, setData] = React.useState({
      name: props.user?.name,
      email: props.user?.email,
      location: props.user?.location,
      lastName: props.user?.lastName,
      publicName:props.user?.publicName,
      position:props.user?.position,
      license:props.user?.license,
      mobileNo:props.user?.mobileNo,
      whatsAppNo:props.user?.whatsAppNo,
       taxNo:props.user?.taxNo,
      language:props.user?.language,
      company:props.user?.company,
      address:props.user?.address,
      serviceAreas:props.user?.serviceAreas,
      about:props.user?.about,
      facebook:props.user?.facebook,
      twitter:props.user?.twitter,
      linkedin:props.user?.linkedin,
      instagram:props.user?.instagram,
      googlePlus:props.user?.googlePlus,
      youtube:props.user?.youtube,
      skype:props.user?.skype,
      website:props.user?.website,
      image:props?.user?.image
    });
    
    
    const addUserToLocalStorage = (user,token) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
    };
    const update=async ()=> {
      const {data:userData,error,isLoading}=await updateUser({ userData:data})
      console.log(userData)
      if(userData!==undefined){
         dispatch(seeAlert({alertText:"Updated Successfully",alertType:"success"}))
         addUserToLocalStorage(userData.user,userData.token)

      }
      if(error){
        dispatch(seeAlert({alertText:error.data.msg,alertType:"danger"}))
      }
      setTimeout(()=>{
        dispatch(removeAlert())
      },3000)
    }
    const removeUserFromLocalStorage = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };

    

    // const [trigger, result] = useLogoutUserApiMutation();
  const logout = () => {
    // trigger();
    removeUserFromLocalStorage()
    dispatch(logoutUser())
  };

    
    function handleChange(e) {
        setData((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value,
            };
        });
    }

    
    const [updateUserPassword] = useUpdateUserPasswordMutation()

    const updatePassword=async ()=>{
        let {data,error,isLoading}=await updateUserPassword({password,confirmPassword})
        if(error){
          dispatch(seeAlert({alertType:"danger",alertText:error.data.msg}))
        }
        if(data){
          dispatch(seeAlert({alertType:"success",alertText:"Password is Updated Successfully"}))
        }
        setTimeout(()=>{
          dispatch(removeAlert())
        },3000)
    }

    React.useEffect(() => {
      if (props.user===null) {
        setTimeout(() => {
          navigate('/Register');
        },100);
      }
    }, [props.user, navigate]);
    
  return (
    <div>
         <div className="div-center-60" ref={alert}>
             {/* {props.showAlert && <Alert />} */}
      </div>
          <Card className="div-center-80 p-[20px]" style={{background:"#5e0606"}}>
        <h2 className="text-white">General Info</h2>
        <div className="grid-16">
        <FormRow name="name" value={data.name} handleChange={handleChange} placeholder="Enter Your Name" />
        <FormRow name="email" value={data.email} handleChange={handleChange} placeholder="Write Your Email" />
        <FormRow name="lastName" value={data.lastName} handleChange={handleChange} placeholder="Enter Your LastName"/>
        <FormRow name="location" value={data.location} handleChange={handleChange} placeholder="Bwp etc"/>
        <FormRow name="publicName" value={data.publicName} handleChange={handleChange} placeholder="Public Name"/>
        <FormRow name="position" value={data.position} handleChange={handleChange} placeholder="Enter You Title Or Position"/>
        <FormRow name="license" value={data.license} handleChange={handleChange} placeholder="Enter Your License"/>
        <FormRow name="mobileNo" value={data.mobileNo} handleChange={handleChange} placeholder="Enter Your Phone No"/>
        <FormRow name="whatsAppNo" value={data.whatsAppNo} handleChange={handleChange} placeholder="Enter Your WhatsApp No with country code"/>
        <FormRow name="taxNo" value={data.taxNo} handleChange={handleChange} placeholder="Enter Your Tax No"/>
        <FormRow name="language" value={data.language} handleChange={handleChange} placeholder="English, Spanish"/>
        <FormRow name="company" value={data.company} handleChange={handleChange} placeholder="Name You Company"/>
        <FormRow name="address" value={data.address} handleChange={handleChange} placeholder="Place Your full adddress"/>
        <FormRow name="serviceAreas" value={data.serviceAreas} handleChange={handleChange} placeholder="What Services You Offer"/>
        <div>

        <label htmlFor="about" className='form-label'></label>
        <p className="label">About</p>  
        <textarea placeholder="Enter Your Precise Description" name="about" onChange={handleChange} value={data.about} className="form-input form-textarea form-font">
        </textarea>
        </div>
        </div>

        <div className="flex gap-[20px] mt-[30px]">
        {props.showAlert && <Alert />}
        <button className="btn" onClick={update} style={{background:"green"}}>
          Update Profile
         </button>
         <button onClick={logout} className="btn">
          Logout
      </button>
        </div>
      </Card>


      <Card  className="div-center-80 p-[20px] mt-[40px] mb-[40px]" style={{background:"#5e0606"}}>
        <h2 className="text-white">Social Media</h2>
        <div className="grid-16">
        <FormRow name="facebook" value={data.facebook} handleChange={handleChange} placeholder="Enter The Facebook URL"/>
        <FormRow name="twitter" value={data.twitter} handleChange={handleChange} placeholder="Enter the Twitter URL"/>
        <FormRow name="instagram" value={data.instagram} handleChange={handleChange} placeholder="Enter the Instagram URL"/>
        <FormRow name="googlePlus" value={data.googlePlus} handleChange={handleChange} placeholder="Enter the Google Plus URL"/>
        <FormRow name="youtube" value={data.youtube} handleChange={handleChange} placeholder="Enter the Youtube URL"/>
        <FormRow name="skype" value={data.skype} handleChange={handleChange} placeholder="Enter the skype ID"/>
        <FormRow name="website" value={data.website} handleChange={handleChange} placeholder="Enter your website URL"/>
        </div>
        <div className="mt-[30px]">


        {props.showAlert && <Alert />}
        <button className="btn" onClick={update} style={{background:"green"}} >
          Update Profile
         </button>
         <button className="ml-[30px] btn mr-[30px]" color="error" onClick={logout} >
        Logout
      </button>
        </div>
      </Card>

    

      <Card  className="div-center-80 p-[20px] mb-[40px]" style={{background:"#5e0606"}}>
        <h2 className="text-white">Change Password</h2>
        <div>
          <FormRow labelText="Change Password" handleChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter the Reset Password" />
          <FormRow labelText="Confirm Password" handleChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Enter the Confirm Password" />
          {props.showAlert && <Alert />}
          <button onClick={updatePassword} style={{background:"green",padding:"10px",color:"white"}} className="mt-[30px] border-t-neutral-600">
            Update Password
         </button>
        </div>
      </Card>
    </div>
  )
}

export default UserDetails
