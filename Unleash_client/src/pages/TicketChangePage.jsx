import TicketChange from "../components/TicketChange";
import DidCertification from "../components/DidCertification";
import { Fragment, useEffect , useState } from "react";
import  DidLoading  from "../components/DidLoading";


const TicketChangePage =() => {
  const [ticket , setticket] = useState(false);
  const [didLoading , setDidLoading] = useState(false);

    return (
      <Fragment>
        { didLoading && (
          <DidLoading />
        )}
        <div className="ticketChange">
          <DidCertification setDidLoading={setDidLoading} setticket={setticket} />
          <TicketChange ticket={ticket} />
        </div>
      </Fragment>
    );
  }

  export default TicketChangePage;
