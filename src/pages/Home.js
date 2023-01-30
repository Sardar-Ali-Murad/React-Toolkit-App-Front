import React from 'react'
import {Carosel,FeaturedCarosel,MileStone,TopProperties,StaticImage,DHA,Teams,Testimonial
} from "../components/index"
import { useSelector, useDispatch } from 'react-redux'
import { useAllPropertiesQuery} from "../services/Api"
import {getAllPoperties } from "../features/user/userSlice"

const Home = () => {
  const dispatch = useDispatch()
  let {data,error,isLoading}= useAllPropertiesQuery()
  console.log(data)
  if(isLoading){
    return <h1 className='label' style={{color:"black"}}>Loading...</h1>
  }
  if(data){
    dispatch(getAllPoperties({data:data?.PropertiesAll}))
  }
  return (
    <div>
      <Carosel/>
       <FeaturedCarosel/>
      <MileStone/>
      <TopProperties/>
      <StaticImage/>
      {/* <DHA/> */}
      <Teams/>
      <Testimonial/> 
    </div>
  )
}

export default Home
