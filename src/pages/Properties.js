import {Filters}  from "../components/index"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAllPropertiesQuery} from "../services/Api"
import {getAllPoperties } from "../features/user/userSlice"

const Properties = () => {
    const dispatch = useDispatch()
    let {data,error,isLoading}= useAllPropertiesQuery()
    console.log(data)
    if(isLoading){
      return <h1 className="label" style={{color:'black'}}>Loading...</h1>
    }
    if(data){
      dispatch(getAllPoperties({data:data?.PropertiesAll}))
    }

  return (
    <div>
      <Filters/>
    </div>
  )
}

export default Properties
