import React from "react";
import CartItem from "./CartItem";
import getStripe from "./Stripe"
import {
  useDeleteAllOrdersMutation,
  useUserOrdersQuery,
  useLoadStripeMutation
} from "../services/Api";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../features/user/userSlice";
const CartItems = () => {
  let [loading,setLoading]=React.useState(false)
  let dispatch = useDispatch();
  let { userOrders } = useSelector((state) => state.counter);
  let [trigger] = useDeleteAllOrdersMutation();
  const clear = async () => {
    await trigger();
    try {
      let { data } = await axios.get("https://react-toolkit-app-back.vercel.app/api/v1/Orders",,{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`}})
        dispatch(getUserOrders({ orders: data.AllOrders }));
    } catch (error) {
      console.log(error)
    }
  };

  let [Stripe]=useLoadStripeMutation()
  const stripeFunction=async ()=> {
    setLoading(true)
    const stripe = await getStripe();
   let {data,isLoading,error}= await Stripe({userOrders})
    if(data){
      stripe.redirectToCheckout({ sessionId:data.id });
    }
    setLoading(false)
  }
 

  return (
    <div className="main-div-margins">
      <div className="div-center-80  cart-main">
        <div className="grid-even-3 cart-head">
          <p>Item</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>
        <div
          className="line"
          style={{ marginTop: "10px", marginBottom: "30px" }}
        ></div>
        {userOrders?.map((all) => {
          return <CartItem all={all} key={all?._id} />;
        })}
      </div>

      {loading && <h1 className="label" style={{color:"black",textAlign:"center"}}>Loading...</h1>}
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="div-center-80 btns-main"
      >
        <button className="shop-btn dark btn" onClick={stripeFunction}>
          Pay Now
        </button>
        <button className="shop-btn dark btn" onClick={clear}>
          Clear Shopping Card
        </button>
      </div>
    </div>
  );
};

export default CartItems;
