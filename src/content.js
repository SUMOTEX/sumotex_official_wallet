/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import App from "./App";
import API from "./services/API";
class Main extends React.Component {
  render() {
    return (
      <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
        <FrameContextConsumer>
          {
            ({ document, window }) => {
              return <App document={document} window={window} isExt={true} />
            }
          }
        </FrameContextConsumer>
      </Frame>
    )
  }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      toggle();
    }
    if (request.message === "tab_url") {
      var matches_connect = []
      var matches_wallet = []
      var nft_connect = []
      const re = new RegExp('connect', 'gi')
      matches_connect = document.documentElement.innerHTML.match(re)
      const re2 = new RegExp('wallet', 'gi')
      matches_wallet = document.documentElement.innerHTML.match(re2)
      const re3 = new RegExp('nft', 'gi')
      nft_connect = document.documentElement.innerHTML.match(re3)

      if ((matches_connect.length >= 1 && matches_wallet.length >= 1) || nft_connect.length>=1) {
        var time = +new Date();
        chrome.storage.local.get(["token"], function (items) {
          // NOTE: check syntax here, about accessing 'authToken'
          var authToken = items.token
          if (authToken !== null) {
            const headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'token': authToken
            }
            try {
              API.post('securityCheckpoint/verify',
                {
                  "url": request.url
                },
                {
                  "headers": headers
                }
              ).then(response => {
                if (response.data.response_code === 1000) {
                  chrome.storage.sync.set({ 'visitedURL': { pageUrl: request.url, url_type: response.data.response_code, url_message: response.data.message, time: time } }, function () {
                    app.style.display = "block";
                  });
                } else if (response.data.response_code === 1001) {
                  app.style.display = "none";
                  //setState(state => ({ ...state, errorMessage: response.data.message }))
                } else if (response.data.response_code === 1002) {
                  chrome.storage.sync.set({ 'visitedURL': { pageUrl: request.url, url_type: response.data.response_code, url_message: response.data.message, time: time } }, function () {
                    app.style.display = "block";
                  });
                }
              })
            } catch (error) {
              //setState(state => ({ ...state, errorMessage: "Seems like your token have expired, please retry" }))
            }
          }
        });
        //<SecurityDomain domainName={toString(request.url)}/>
      }
    }
  }
);

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}
