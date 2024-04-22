import { useEffect, useState } from "react";

const useGetUrl = () => {
    const [tabUrl, settabUrl ] = useState();
    useEffect(() => {
        const getUrl = () => {
            chrome.runtime.sendMessage({ type: 'tabUrl' }, (response) => {
                if (response && response.tabUrl)
                    settabUrl(response.tabUrl);
                else
                    console.log(response.error)
            });
        }
        getUrl();
    }, []);
    
    return { tabUrl };
};

export default useGetUrl;

