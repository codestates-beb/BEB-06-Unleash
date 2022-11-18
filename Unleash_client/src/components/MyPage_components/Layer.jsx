import React from "react";

const Layer = () => {
  const arr = Array.from(Array(20));
  
  return (
    <>
      {arr.map((item, idx) => <div className="mypage_layer" key={idx} data-hello={'hello Ethan!'}></div>)}
    </>
   );
  }
export default Layer;
