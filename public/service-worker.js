chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'tabUrl') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const currentUrl = tabs[0].url;
        sendResponse({ tabUrl: currentUrl });
      } else {
        sendResponse({ error: 'No active tabs found' });
      }
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'saveInput' && message.tabUrl) {

      const { tabUrl, data } = message;

      chrome.storage.local.get(tabUrl, (result) => {
        if (chrome.runtime.lastError) {
          console.log('Error in retrieving data');
        }
        else {

          const existingData = result[tabUrl] || [];
          const updatedData = [...existingData, data];

          chrome.storage.local.set({ [tabUrl]: updatedData }, () => {
            if (chrome.runtime.lastError) {
              console.log('Error saving data');
            }
          });
        }
      });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getData') {
    chrome.storage.local.get(message.tabUrl, (result) => {
      if (chrome.runtime.lastError) {
        sendResponse({ error: 'Error while retrieving data' });
      }
      else {
        sendResponse({ data: result });
      }
    });
    return true;
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'updateData' && message.tabUrl) {
    const { tabUrl, data } = message;
    chrome.storage.local.set({ [tabUrl]: [...data] }, () => {
      if (chrome.runtime.lastError) {
        console.log('Error saving data');
      }
    });
  };
});



