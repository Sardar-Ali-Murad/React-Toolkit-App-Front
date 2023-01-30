import React from "react";
import CartItems from "../components/CartItems";
import CartPrice from "../components/CartPrice";
import { useUserOrdersQuery } from "../services/Api";
import { Link } from "react-router-dom";
import { getUserOrders } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
const Cart = () => {
 
  let dispatch = useDispatch();
  let {userOrders}=useSelector((data)=>data.counter)

  React.useEffect(()=>{
    const start=async ()=>{
      try {
        let {data}=await axios.get("http://localhost:5000/api/v1/Orders",{withCredentials:true})
        dispatch(getUserOrders({ orders: data.AllOrders }))
      } catch (error) {
        console.log(error)
      }
    }
     start()
  },[])
 

    if (userOrders.length=== 0) {
      return (
        <div
          className="div-perfect-center"
          style={{
            paddingBottom: "200px",
            zIndex: "2",
            padding: "20px",
            borderRadius: "20px",
            backdropFilter: "blur(20px)",
          }}
        >
          <h4 className="text-white" style={{ color: "black" }}>
            Your Cart Is Empty{" "}
          </h4>
          <Link
            to="/Properties"
            style={{ color: "black" }}
            className="text-center"
          >
            <button
              className="shop-btn dark btn text-center"
              style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            >
              Fill No
            </button>
          </Link>
        </div>
      );
    }

  return (
    <div>
      <CartItems/>
      {/* <CartPrice cart={data?.AllOrders} />   */}
    </div>
  );
};

export default Cart;
