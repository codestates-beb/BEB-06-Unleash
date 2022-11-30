import React, { Fragment , useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const VcPopup = (props) => {
    const [textview ,setTextview] = useState(false);

    const onClickCopyText = () => {
        const $textarea = document.createElement("textarea");
        // body 요소에 존재해야 복사가 진행됨
        document.body.appendChild($textarea);
        
        // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
        $textarea.value = props.vcJwt;
        $textarea.select();
        
        // 복사 후 textarea 지우기
        document.execCommand('copy');
        document.body.removeChild($textarea);
        setTextview(true)
        setInterval( () => setTextview(false) , 3000)

    }

    const downloadFile = async ({ data, fileName, fileType }) => {
        //파일로 다운로드할 데이터로 Blob를 만든다 [Blob이란? (Binary Large Object, 블랍) 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용]
        const blob = new Blob([data], { type: fileType });
        // a태그를 생성하고 해당 요소에 클릭 이벤트를 보낸다
        // 다운로드를 한다
        const link = document.createElement('a');
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
    
        const clickEvt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        link.dispatchEvent(clickEvt);
        link.remove();
      };


    const onDownloadBtn = () => {
        const name = 'vc'; //파일명
        downloadFile({
          data: JSON.stringify(props.vcJwt),
          fileName: `${name}.json`,
          fileType: 'text/json',
        });
      };

  return (
    <Fragment>
        <div className="dim" ></div>
        <div className="vcPopup">
            <AiOutlineClose className="login_close_icon"  onClick={  () => props.setVcPopup(false)  } /> 
            <div className="vcPopup_main_text"> Vc Management </div>

            <div className="vc_Popup_copy_text" onClick={onClickCopyText} >
                <span className="vcPopup_span" >{props.vcJwt}</span> 
                <IoCopyOutline className="copy_icon" /> 
            </div>

            {textview && (
             <div className="vcPopup_complete" >코드 복사완료!</div>
            )}  

            <div className="vcPopup_download" onClick={onDownloadBtn} > <FiDownload className="download_icon" /> Download</div>

        </div>
    </Fragment>
  );
};

export default VcPopup;
