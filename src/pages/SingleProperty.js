import React from "react";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import {
  useSinglePropertyQuery,
  useCreateOrderMutation,
} from "../services/Api";
import { seeAlert, removeAlert } from "../features/user/userSlice";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
const Property = () => {
  let { id } = useParams();
  let navigate=useNavigate()
  let [order] = useCreateOrderMutation();
  let dispatch = useDispatch();
  let { user, showAlert } = useSelector((state) => state.counter);
  const [color, setColor] = React.useState("");
  let { data, error, isLoading } = useSinglePropertyQuery({ id });
  const [count, setCount] = React.useState(1);

  if (isLoading) {
    return <h1 className="label" style={{color:"black"}}>Loading...</h1>
  }

  function minus() {
    let num = count - 1;
    if (num < 1) {
      setCount(count);
    } else {
      setCount((pre) => pre - 1);
    }
  }

  function plus() {
    let num = count + 1;
    if (num > 10) {
      setCount(count);
    } else {
      setCount((pre) => pre + 1);
    }
  }

  const cartHandler = async () => {
    if (user === null) {
       navigate("/Register")
    } else {
      let { data, error } = await order({
        quantity: count,
        color: color,
        product: id,
      });
      if (data) {
        dispatch(
          seeAlert({
            alertType: "success",
            alertText: "The Order is added to the cart successfully",
          })
        );
      }
      if (error) {
        dispatch(seeAlert({ alertType: "danger", alertText: error.data.msg }));
      }

      setTimeout(() => {
        dispatch(removeAlert());
      }, 3000);
    }
  };

  return (
    <div>
      <div className="grid-even-2 single-product-main div-center-80 main-div-margins">
        <div className="p-img">
          <div>
            <img
              style={{ height: "80%", width: "100%" }}
              src={data.Property?.image}
            />
          </div>
          <div></div>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <h1 style={{ marginTop: "10px" }}>Color:</h1>
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
              {data.Property?.colors?.map((all, i) => {
                return (
                  <div key={i}>
                    <div
                      className="color"
                      onClick={() => setColor(all)}
                      style={{
                        background: all,
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                      }}
                    >
                      <TiTickOutline
                        className={`tick ${color === all ? "activeTick" : ""}`}
                        onClick={() => setColor(all)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            {showAlert && <Alert />}
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <AiOutlineMinus className="minus" onClick={minus} />
              <h1>{count}</h1>
              <AiOutlinePlus className="plus" onClick={plus} />
            </div>
            <button className="shop-btn dark btn" onClick={cartHandler}>
              Add To Cart
            </button>
          </div>
        </div>

        <div>
          <h3>{data.Property?.name}</h3>
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "30px",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            <p className="form-font">(20 customers reviews)</p>
          </div>
          <h5 style={{ color: "brown" }}>${data.Property?.price}</h5>
          <p className="label" style={{ color: "black" }}>
            {data.Property?.description}
          </p>
          <div className="items-flex">
            <h3>Available:</h3>
            <p className="item-small form-font">InStock</p>
          </div>
          <div className="items-flex">
            <h3>SKU:</h3>
            <p className="item-small form-font">{data.Property?._id}</p>
          </div>
          <div className="items-flex">
            <h3>Brand:</h3>
            <p className="item-small form-font">{data.Property?.company}</p>
          </div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Property;
