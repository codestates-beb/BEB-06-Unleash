import TicketChange from "../components/TicketChange";
import DidCertification from "../components/DidCertification";
import { Fragment, useEffect , useState } from "react";


const TicketChangePage =() => {
  const [ticket , setticket] = useState(false);

    return (
        <div className='ticketChange' >
          <DidCertification />
          <TicketChange ticket={ticket} />
    </div>
    );
  }

  export default TicketChangePage;
