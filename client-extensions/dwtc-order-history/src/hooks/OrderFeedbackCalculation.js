import React, { useEffect, useState } from "react";
import { ErrorConstants, getMicroServiceUserAgent } from "../../../dwtc-common-utility/src";

export default function useOrderFeedbackCalculation({cartId}){
    const [averageRating, setAverageRating] = useState(null);
    const oAuth2Client = getMicroServiceUserAgent();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function fetchData(){
            try{
                const reqCall = await oAuth2Client?.fetch(`/o/headless-commerce-admin-order/v1.0/orders/${cartId}/feedbackRatingOnOrder`);
                if (!reqCall){
                    setError(ErrorConstants.FEEDBACK_ERROR);
                    return;
                }
                const items = reqCall.items;

                if (!items.length) {
                    setAverageRating(0);
                    setLoading(false);
                    return;
                }
          
                const totalRatings = items.reduce(
                    (sum, item) => sum + (item.userFeedbackRating || 0),
                    0
                );
          
                const avgRating = totalRatings / items.length;
          
                setAverageRating(avgRating);

            }catch(err){
                console.error("Exception while fetching average rating of order :: "+err);
                setError(ErrorConstants.FEEDBACK_ERROR);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[cartId]);
    return {averageRating, error, loading};
}