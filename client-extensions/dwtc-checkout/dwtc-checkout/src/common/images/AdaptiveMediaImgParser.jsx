import React, { useEffect, useState } from "react";
import { getMicroServiceUserAgent } from "../../../../dwtc-common-utility/src/hooks/HeadlessUserAgentService";

export function AdaptiveMediaImgParser({ adaptiveMediaImageHTMLTag }) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(adaptiveMediaImageHTMLTag, "text/html");
    const pictureTag = doc.body.querySelector("picture");
    const fileEntryId = pictureTag?.dataset.fileentryid;
    console.log("imgsrc is "+fileEntryId);

    const {dlFile} = useDocumentFetch(fileEntryId);
    if (!dlFile) return null;

    console.log("dlFile is :: "+dlFile);
    const url = dlFile.contentUrl;
    return <img src={url} alt="adaptive media" />;
}

export function useDocumentFetch(dlFileEntryId){
    const [dlFile, setDLFile] = useState();

    const oAuth2Client = getMicroServiceUserAgent();

    useEffect(()=>{
        if (!dlFileEntryId) return;

        async function fetchData() {
            try{
                console.log("dlFileEntryId is "+dlFileEntryId);
                const dlFileEntryReq = await oAuth2Client?.fetch(`/o/headless-delivery/v1.0/documents/${dlFileEntryId}`);
                if(!dlFileEntryReq){
                    console.error("error");
                    return;
                }

                const dlFileEntryRes = dlFileEntryReq;
                console.log(dlFileEntryRes);
                setDLFile(dlFileEntryRes);

            }catch(err){
                console.error("exception"+err);
            }
        }
        fetchData();
    }, [dlFileEntryId]);
    return {dlFile};

}