import React, { useEffect, useState } from "react";
import { Constants, getMicroServiceUserAgent } from "../../../dwtc-common-utility/src";


export default function useRatingSystemPicklist(){
    const [ratingSystem, setRatingSystem] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const oAuth2Client = getMicroServiceUserAgent();

    useEffect(()=>{
        async function fetchData(){
            try{
                const reqCall = await oAuth2Client?.fetch(`/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${Constants.RATING_SYSTEM_PICKLIST_ERC}/list-type-entries`);
                if (!reqCall){
                    return;
                }
                setRatingSystem(reqCall);
            }catch(err){
                console.err(Constants.ERROR_FETCHING_RATING_PICKLIST);
                setError(Constants.ERROR_FETCHING_RATING_PICKLIST);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return {ratingSystem, error, loading};
}