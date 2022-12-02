import TicketChange from "../components/TicketChange";
import DidCertification from "../components/DidCertification";
import { Fragment , useState } from "react";
import  DidLoading  from "../components/DidLoading";


const TicketChangePage =() => {
  const [ticket , setticket] = useState(false);
  const [didLoading , setDidLoading] = useState(false);
  const [ text , setText ] = useState("");

    return (
      <Fragment>
        { didLoading && (
          <DidLoading text={text}/>
        )}
        <div className="ticketChange">
          <DidCertification setDidLoading={setDidLoading} setticket={setticket} setText={setText} />
          <TicketChange ticket={ticket} />
        </div>
      </Fragment>
    );
  }

  export default TicketChangePage;
