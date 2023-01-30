import FormRowSelect from "./FormRowSelect";
import FormRow from "./FormRow";
import { TiTickOutline } from "react-icons/ti";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {   useGetFilteredPropertiesQuery}  from "../services/Api"

const Filters = () => {
    
    let [dataInfo, setDataInfo] = React.useState({
      search: "",
      category: "",
      company: "",
      sort: "",
      price: "",
    });
    let { Properties } = useSelector((state) => state.counter);
    const [colorOption, setColorOption] = React.useState("");
  let categoryArr = ["All", ...new Set(Properties.map((all) => all?.category))];
  let companyArr = ["All", ...new Set(Properties.map((all) => all?.company))];
  let Colors = [];
  let colorsArr = [
    ...new Set(
      Properties?.map((all) =>
      all?.colors?.map((c) => (Colors = [...Colors, c]))
      )
      ),
    ];
  Colors = ["All", ...new Set(Colors)];

  let SortArr = [
    "Sort",
    "price (Lowest)",
    "price (highest)",
    "name(a-z)",
    "name(z-a)",
];

let pri = Properties.map((all) => Number(all?.price)).sort((a, b) => a - b);


function handleInputs(e) {
    setDataInfo((pre) => {
        return {
            ...pre,
        [e.target.name]: e.target.value,
    };
    });
}

function colorHandler(col) {
    setColorOption(col);
}

  function cle() {
    setDataInfo({
      search: "",
      category: "",
      company: "",
      sort: "",
      price: "",
    });
    setColorOption("");
}

let {data:filteredProperties,error,isLoading}=useGetFilteredPropertiesQuery({sort:dataInfo.sort,color:colorOption,category:dataInfo.category,company:dataInfo.company,price:dataInfo.price,search:dataInfo.search})

if(isLoading){
    return <h1 className="label" style={{color:"black"}}>Loading...</h1>
}


if (filteredProperties.length <1) {
    return (
        <h2 className="text-center main-div-margins">
        Soory There is no such product that match your criteria...
      </h2>
    );
  }

 


  return (
    <div>
      <div className="grid-12 div-center-80 main-div-margins">
        <FormRow
          labelText="Search By Name"
          name="search"
          handleChange={handleInputs}
          value={dataInfo.search}
          className="dark form-input"
        />
        <FormRowSelect
          value={dataInfo.category}
          list={categoryArr}
          labelText="Category"
          name="category"
          handleChange={handleInputs}
        />
        <FormRowSelect
          value={dataInfo.company}
          list={companyArr}
          labelText="Company"
          name="company"
          handleChange={handleInputs}
        />

        {/*  */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <h4 style={{ marginTop: "10px", marginTop: "20px" }}>Color:</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {Colors?.map((all) => {
              return (
                <div key={all}>
                  <div
                    className="color"
                    onClick={() => colorHandler(all)}
                    style={{
                      background: all,
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  >
                    <TiTickOutline
                      className={`tick ${
                        colorOption === all ? "activeTick" : ""
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}

        {/* <FormControlLabel  control={<Checkbox />} value={freeShipping}  label="Free Shipping" name="freeShipping" onChange={handleRadio} className="form-font" /> */}

        <FormRowSelect
          value={dataInfo.sort}
          labelText="Sort"
          handleChange={handleInputs}
          name="sort"
          list={SortArr}
        />

        <FormRow
          max={pri[pri.length - 1]}
          min={pri[0]}
          type="range"
          labelText={`Price $${dataInfo.price}`}
          name="price"
          handleChange={handleInputs}
          value={dataInfo.price}
        />

        <button
          style={{
            height: "40px",
            width: "120px",
            marginTop: "30px",
            background: "red",
          }}
          className="btn roboto"
          onClick={cle}
        >
          Clear
        </button>
      </div>

      {/* The Properties */}
      <div className="grid-18 div-center-80 main-div-margins">
        {filteredProperties?.Properties.map((product) => {
          return (
            <div key={product?._id}>
                  <Link to={`/Properties/${product?._id}`}>
              <div className="f-single-card">
                <div className="f-img-main">
                  <img
                    style={{ objectFit: "cover" }}
                    src={product?.image}
                    alt="Image"
                  />
                    <BsSearch className="search div-perfect-center" />
                </div>
                <div className="f-overlay"></div>
              </div>
              </Link>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <p className="dark form-font">{product?.name}</p>
                <p style={{ color: "brown" }} className="form-font">
                  ${product?.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
