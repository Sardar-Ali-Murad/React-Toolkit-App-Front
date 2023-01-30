import React from 'react'
import {HomeFront,NewsLetter,CustomFurniture,Featured}  from "../components/index"
import { useSelector, useDispatch } from 'react-redux'
import { useAllPropertiesQuery} from "../services/Api"
import {getAllPoperties } from "../features/user/userSlice"

const Index = () => {
  const dispatch = useDispatch()
  let {data,error,isLoading}= useAllPropertiesQuery()
  if(isLoading){
    return <h1 className='label' style={{color:"black"}}>Loading...</h1>
  }
  if(data){
    dispatch(getAllPoperties({data:data?.PropertiesAll}))
  }
  return (
    <div>
        <HomeFront/>
      <Featured/>
      <CustomFurniture/>
      <NewsLetter/>
    </div>
  )
}

export default Index
