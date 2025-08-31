import React, { useEffect, useState } from "react";
import { getMicroServiceUserAgent } from "../../services/UserAgentService";
import Constants from "../../utility/Constants";

export function TakeAwayAddress(){
    const [takeAwayAddress, setTakeAwayAddress] = useState(null);

    const oAuth2Client = getMicroServiceUserAgent();
    
    useEffect(()=>{
        async function fetchData() {
            try{
                const reqCall = await oAuth2Client?.fetch(`/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${Constants.TAKE_AWAY_LOCATION_PICKLIST}/list-type-entries`);
                if (!reqCall){
                    throw new Error("Exception from fetching picklist data");
                }

                const res = reqCall;
                setTakeAwayAddress(res);
            }catch(err){
                console.error("exception while fetching data address for takeaway ");
            }
        }
        fetchData();
    }, [])
}