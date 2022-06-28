/* global chrome */
import {
  isGraphQL,
  parseEntry,
} from './lib/utils';

let alreadyShown = false;

const parseLogToState = (log) => {
  if (!isGraphQL(log)) return null;
  return parseEntry(log)
    .then(data => {
      window.testVariable = {...window.testVariable, data}
      console.log(window.testVariable)
    });
};


const requestHandler = (request) => {
  parseLogToState(request);
};

function createPanel() {
  const theme = chrome.devtools.panels.themeName || 'default';

  

  chrome.devtools.panels.create('GraphQL Network',
    './icons/icon48.png',
    './panel.html',
    (panel) => {
      panel.onShown.addListener((panelWindow) => {
        if (!alreadyShown) {
          chrome.devtools.network.onRequestFinished.addListener(requestHandler);
        }
        alreadyShown = true;
      });
    },
  );
}

createPanel();
