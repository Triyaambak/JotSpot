const useSendMessage = (currentUrl,input) => {
    chrome.runtime.sendMessage({ type: 'saveInput', tabUrl: currentUrl, data: input });
}

export default useSendMessage;