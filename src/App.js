import {BrowserRouter,Route,Routes} from "react-router-dom"
import {FAQS,ForgetPassword,ResetPassword,Register,Login,Terms,Privacy,User,Home,ProtectedRouteUser,About,Properties,SingleProperty,Cart,OrderFailure,OrderSuccess}  from "./pages/index"
import Navbar from "./components/Navbar"
import MainFooter from "./components/MainFooter"
import React from "react"
// import { useSelector, useDispatch } from 'react-redux'
// import {useCurrentUserQuery} from "./services/Api"
// import {getCurrentUser }  from "./features/user/userSlice"


function App() {
  // const dispatch = useDispatch()

  // let {data,error,isLoading}= useCurrentUserQuery()
  // if(isLoading){
  //   return <div className="spinner"></div>
  // }
  // if(data){
  //   dispatch(getCurrentUser({user:data?.user}))
  // }
  
  return (
    <div style={{overflowX:"hidden"}}>
    <BrowserRouter>
       <Navbar/>
      <Routes>
      <Route
          path='/User'
          element={
            // <ProtectedRouteUser>
              <User/>
            //  </ProtectedRouteUser>
          }
        />
        <Route path='/' element={<Home/>}/>
        <Route path="/FAQ" element={<FAQS/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Privacy" element={<Privacy/>}/>
        <Route path="Terms" element={<Terms/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/Properties" element={<Properties/>}/>
        <Route path="/Properties/:id" element={<SingleProperty/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/orderSuccess" element={<OrderSuccess/>}/>
        <Route path="/orderCanceled" element={<OrderFailure/>}/>
      </Routes>
      <MainFooter/>
    </BrowserRouter>
    </div>
  );
}

export default App;
