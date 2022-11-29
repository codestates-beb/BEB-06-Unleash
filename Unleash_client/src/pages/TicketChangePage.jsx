import TicketChange from "../components/TicketChange";
import DidCertification from "../components/DidCertification";
import { Fragment, useEffect , useState } from "react";
import  DidLoading  from "../components/DidLoading";


const TicketChangePage =() => {
  const [ticket , setticket] = useState(false);
  const [didLoading , setDidLoading] = useState(false);

  const text = "지갑주소로 VC 생성 요청 중입니다."

    return (
      <Fragment>
        { didLoading && (
          <DidLoading text={text}/>
        )}
        <div className="ticketChange">
          <DidCertification setDidLoading={setDidLoading} setticket={setticket} />
          <TicketChange ticket={ticket} />
        </div>
      </Fragment>
    );
  }

  export default TicketChangePage;
