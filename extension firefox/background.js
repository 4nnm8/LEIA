var leia = {
  mode: 1,
  pred: 0,
  high: 0,
  styl: ''
}
function onError(e) {
  console.error(e);
}
function checkStoredSettings(storedSettings) {
  if (!storedSettings.leia) {
    browser.storage.local.set({leia});
  }
}
var gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

function handleClick() { browser.runtime.openOptionsPage(); }
browser.browserAction.onClicked.addListener(handleClick);
browser.runtime.onMessage.addListener(handleClick);