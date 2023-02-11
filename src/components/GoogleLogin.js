import React from 'react';
import {GoogleLogin}  from "@react-oauth/google"
// import { gapi } from "gapi-script";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {  useGoogleLoginMutation}  from "../services/Api"
import {seeAlert,removeAlert}  from "../features/user/userSlice"
import {  useDispatch } from 'react-redux'
import {loginUsingGoogle}  from "../features/user/userSlice"

// Gapi Cases the problems sometime and react-google-login is depreciated so we are not using it 

export default function Landing() { 
  const dispatch = useDispatch()



  // gapi.load("client:auth2", () => {
  //   gapi.client.init({
  //     client_id:"705164632277-vhv4q8ki9tntsbiv8n0do8l9rdbd1knk.apps.googleusercontent.com",
  //     plugin_name: "chat",
  //     apiKey: "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",
  //   });
  // });
  const addUserToLocalStorage = (user,token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  };
  let [googleLogin]=  useGoogleLoginMutation()
   const responseGoogleSuccess = async (response) => {
       try {
        let {data,error}=await googleLogin({response:response})
        if(data){
          dispatch(seeAlert({alertType:"success",alertText:"Authentication Success! Redirecting"}))
        }
        if(error){
          dispatch(seeAlert({alertType:"danger",alertText:error.data.msg}))
        }
        setTimeout(()=>{
           dispatch(removeAlert())
        },3000)
        
        dispatch(loginUsingGoogle({user:data.user}))
        addUserToLocalStorage(data.user,data.token)
       } catch (error) {
         console.log(error.response.data.msg);
       }     
   }
   

   const responseGoogleError = (response) => {
           console.log(response)
   }
   
  return (
    <div className="App">
          <GoogleOAuthProvider clientId="705164632277-vhv4q8ki9tntsbiv8n0do8l9rdbd1knk.apps.googleusercontent.com">
     <GoogleLogin
    // clientId="705164632277-vhv4q8ki9tntsbiv8n0do8l9rdbd1knk.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleError}
    cookiePolicy={'single_host_origin'}
    />
    </GoogleOAuthProvider>
    </div>
  );
}


