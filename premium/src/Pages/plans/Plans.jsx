import React, { useState } from "react";
import "./plans.css";
import { data } from "../../data/data";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios"
import { useAuth } from "../../context/auth/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import swal from "sweetalert"
import {  useNavigate } from "react-router-dom";
import Toggle from "../../components/toggle/Toggle";

const Plans = () => {
  
  const {userId} = useAuth();
  const [pro,setProd]= useState(null)
  const [ind,setInd] = useState(null);
  const [planName,setPlanName] = useState("Monthly");
  const publishableKey = "pk_test_51NdVhHSFxLGwFziWgWdktq2XXGmA4lrsCpPan33hnHHInFyt9jxEfVKbIQpscUewoIAof3EhxzEzoaqdIl8Prc3N00Y616b2ia"
  const handleClick = (i) => {
    setInd((prev) => (prev === i ? null : i));
    
    setProd(data[i]);
    
  };

  const onTabChange = (name)=>{
    // console.log("Inside This tabchange")
    // console.log(name)
    setPlanName(name)
    // console.log("Hello")
  }


  const navigate = useNavigate();
  
  const payNow = async (token)=>{
    const newPro = {
      canWatch:pro.canWatch,
      quality:pro.quality,
      plansInfo:pro.plansInfo,
      resol:pro.resol,
      price:planName==="Monthly" ? pro.mPrice : pro.yPrice
    }
    const newData = {...newPro,userId:userId}
    console.log(newData)
     try {
      const res = await axios.post("https://premium-app-vha0.onrender.com/api/user/subscribe",{newData,token});
      swal({
        title: "Payment Succesfully Done!",
        icon: "success",
        buttons: false,
        timer:1000,
      });
      setTimeout(()=>{
        navigate("/")
      },1500)
      
     } catch (error) {
      swal({
        title: "Opps Something wrong",
        icon: "error",
        buttons: false,
        timer: 2000,
      });
     }
  }
  console.log('pro is: ',pro)
  console.log('planname is: ',planName)
  return (
    <>
    <Navbar />
    <div className="container">
      <h1 className="tit">Choose the right plan for you</h1>
      <div className="container-part2">
        <div className="left">
          <div className="toggle">
            <Toggle info={["Monthly","Yearly"]} onTabChange={onTabChange}/>
          </div>
          <div className="txt-info">
            <div>Monthly Price</div>
            <div>Video Quality</div>
            <div>Resolution</div>
            <div>Devices you can watch on</div>
          </div>
        </div>
        <div className="right">

            {
              data?.map((e,i)=>(
                <div key={e.mPrice} className={`right-part2 ${ind === i ? "selected" : ""}`} onClick={()=>handleClick(i)} >
                  <div className="plansInfo">{e.plansInfo}</div>
                  <div className="price">₹{planName==="Monthly" ? e.mPrice : e.yPrice}</div>
                  <div className="quality">{e.quality}</div>
                  <div className="resol">{e.resol}</div>
                  <div className="canWatch">{e.canWatch}</div>
              </div>

              ))
            }
              
            

        </div>
        
        

      </div>


      <StripeCheckout
      key={planName==="Monthly" ? pro?.mPrice : pro?.yPrice}
      stripeKey={publishableKey}
      label="Next"
      name="Pay with credit carx"
      amount={+`${planName==="Monthly" ? pro?.mPrice : pro?.yPrice}`}
      description={`Your total is ₹${planName==="Monthly" ? pro?.mPrice : pro?.yPrice}`}
      token={payNow}
      disabled={ind === null}
      />
    </div>
    </>
  );
};

export default Plans;
