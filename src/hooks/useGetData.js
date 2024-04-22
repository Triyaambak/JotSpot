const useGetData = () => {

    const getData = (tabUrl) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                type: 'getData',
                tabUrl ,
            }, (response) => {
                if (response && response.data) {
                    resolve(response.data);
                }
                else
                    reject(new Error('Failed to fetch data'));
            })
        });
    };
    
    return { getData };
};

export default useGetData;