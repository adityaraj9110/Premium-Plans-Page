import React, { useState } from 'react'
import "./toggle.css"
const Toggle = (info) => {
  var data = info;
  console.log(info)
  const [left,setLeft]=useState(5);
  const [selectedTab,setSelectedInd] = useState(0);
  // console.log(window.innerWidth+"Width is");
  const handleClick = (i)=>{
      setSelectedInd(i)
      setLeft(left===5? window.innerWidth>760?80:55:5);
      // setLeft(left===5?55:5);
      // console.log(data.info[i])
      info.onTabChange(data.info[i])

  }



  return (
    <div className='tab'>
      <div className="tabItems">
        {
          data.info?.map((item,ind)=>(
            
            <span key={item} onClick={()=>handleClick(ind)} className={`tabItem ${selectedTab===ind? "active":""}`}>{item}</span>
          ))
        }
        <span className="movingBg"  style={{left:left}}/>
      </div>
    </div>
  )
}

export default Toggle;
