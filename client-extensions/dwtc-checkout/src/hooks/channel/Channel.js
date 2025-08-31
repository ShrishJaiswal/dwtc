import React from "react";
import ErrorConstants from "../../utility/ErrorConstants";
import { getMicroServiceUserAgent } from "../../services/UserAgentService";

export function useChannelFetch() {
    const [channel, setChannel] = React.useState(0);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const oAuth2Client = getMicroServiceUserAgent();

    React.useEffect(() => {
     
        async function fetchData() {
            try {
                
                const channelId = Liferay.CommerceContext.commerceChannelId;
                const channelReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-admin-channel/v1.0/channels/${channelId}`);
                
                if (!channelReqCall){
                    setError(ErrorConstants.CHANNEL_ERR);
                    return;
                }

                setChannel(channelReqCall);
                setError(null);
                
            } catch (err) {
                setError(ErrorConstants.CHANNEL_ERR);
            } finally {
                setLoading (false);
            }
        }
    
        fetchData();
    }, []);

    return { channel, error, loading };
}