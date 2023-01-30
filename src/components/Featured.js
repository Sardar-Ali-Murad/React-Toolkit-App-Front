import React from 'react'
import {BsSearch}  from "react-icons/bs"
import { useSelector } from 'react-redux'
import {Link}  from "react-router-dom"
const Featured = () => {
    let {Properties}=useSelector((state)=>state.counter)
  return (
    <div className='div-center-80 '>
       <h1 className='text-center'>Featured Products</h1>
       <div className='grid-15'>
          {
            Properties?.slice(0,3).map((product)=>{
                return (

                  <div key={product?._id}>
                      <Link to={`/Properties/${product?._id}`}>
                <div className='f-single-card'>
                    <div className='f-img-main' >
                      <img alt="Image" src={product.image} />

                         <BsSearch className='search div-perfect-center'/>
                    </div>
                    <div className='f-overlay'></div>
                </div>
                      </Link>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
                        <p className='dark form-font'>{product?.name}</p>
                        <p style={{color:"brown"}} className="form-font">${product?.price}</p>
                    </div>
                </div>
                )

            })
          }
       </div>
    </div>
  )
}

export default Featured
