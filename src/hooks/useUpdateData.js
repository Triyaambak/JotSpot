const useUpdateData = (curentUrl, data) => {
    chrome.runtime.sendMessage({ type: 'updateData', tabUrl: curentUrl, data });
};

export default useUpdateData;