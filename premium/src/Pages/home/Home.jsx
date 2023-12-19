import React, { useEffect, useState } from "react";
import "./home.css";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ind, setInd] = useState(null);
  const [pro, setProd] = useState(null);

  const handleClick = (i) => {
    setInd((prev) => (prev === i ? null : i));
    if (ind != null) {
      setProd(data[i]);
    }
  };

  const id = localStorage.getItem("userId");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://premium-app-vha0.onrender.com/api/user/findById",
          { id }
        );
        setData(res.data.data.plans);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    getData();
  }, []);

  

  return (
    <>
      <Navbar />
      <div className="container_home">
        {loading === true ? (
          <ThreeCircles
            height="100"
            width="100"
            color="#2c387e"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        ) : (
          <>
            <h1 className="tit_home">Your Plans</h1>
            {data?.length === 0 ? (
              <><h2>Nothing Here Go To Plans And Choose Yours</h2></>
            ) : (
              <>
                <div className="container-part2_home">
                  <div className="left_home">
                    <div className="toggle_home">Monthly Subscription</div>
                    <div className="txt-info_home">
                      <div>Monthly Price</div>
                      <div>Video Quality</div>
                      <div>Resolution</div>
                      <div>Devices you can watch on</div>
                    </div>
                  </div>
                  <div className="right_home">
                    {data?.map((e, i) => (
                      <div
                        className={`right-part2_home ${
                          ind === i ? "selected_home" : ""
                        }`}
                        key={e.price}
                        onClick={() => handleClick(i)}
                      >
                        <div className="plansInfo_home">{e?.plansInfo}</div>
                        <div className="price_home">₹{e?.price}</div>
                        <div className="quality_home">{e?.quality}</div>
                        <div className="resol_home">{e?.resol}</div>
                        <div className="canWatch_home">{e?.canWatch}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
