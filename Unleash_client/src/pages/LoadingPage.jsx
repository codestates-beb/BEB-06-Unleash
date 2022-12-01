import {  useEffect} from 'react';

function LoadingPage() {

  const onProgress = () => {
    var elm = document.querySelector('#progress');
    if(!elm.innerHTML.match(/99%/gi)){
      elm.innerHTML = (parseInt(elm.innerHTML) + 1) + '%';
    } else {
      clearInterval();
    }

  }


  useEffect(() => {
    let progress = setInterval(() => onProgress(),15)

    return () => clearInterval(progress);
});

    return (
      <div className="loading">
      <div className="loading_flex">
        <input  className='loading_input' type="checkbox" id="water" />
        <label className='loading_water_label' htmlFor="water">
          <div className='loading_water_fill' id="fill"></div>
        </label>
        <div className="loading_text_bar">
          <span className='loading_span' >Progress</span>
          <span className='loading_span_right'  id="progress">0%</span>
        </div>
      </div>
      <div>
        <p>승인 처리중입니다 약 1~2분 정도 소요되며, 이더리움 Goerli 네트워크 상태에 따라 지연될수 있습니다.</p>
      </div>
      <div  >
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use
              href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
    );
  }
  
  export default LoadingPage;
  