// Initialize persistent storage for tab URL tracking
chrome.storage.local.get('tabIdToPreviousUrl', function (result) {
    if (!result.tabIdToPreviousUrl) {
        chrome.storage.local.set({ 'tabIdToPreviousUrl': {} });
    }
});

// Listener for when the browser action is clicked
chrome.action.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
    });
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'createWallet') {
        // Call to create-wallet endpoint
        callApiEndpoint('https://rpc.sumotex.co/create-wallet',{}, sendResponse);
        return true;
    }  else if (message.action === 'getWalletBalance') {
        callApiEndpoint('https://rpc.sumotex.co/get-wallet-balance', message.inputBody, sendResponse);
        return true;
    }
});

// Generalized function to call API endpoints
function callApiEndpoint(url,inputBody, sendResponse) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Additional headers as needed
        },
        body: JSON.stringify(inputBody) // Update this as needed based on the endpoint
    })
    .then(response => response.json())
    .then(data => {
        sendResponse({ result: data });
    })
    .catch(error => {
        sendResponse({ error: error.message }); // Send error message back
    });
}

// Listener for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url) {
        chrome.storage.local.get('tabIdToPreviousUrl', function (result) {
            var previousUrl = result.tabIdToPreviousUrl[tabId] || "";
            
            // Add your URL change logic here
            // if (tab.url !== previousUrl) {
            //     chrome.tabs.sendMessage(tabId, { "message": 'tab_url', "url": tab.url });
            // }

            // Update the stored URL for this tab
            result.tabIdToPreviousUrl[tabId] = tab.url;
            chrome.storage.local.set({ 'tabIdToPreviousUrl': result.tabIdToPreviousUrl });
        });
    }
});
