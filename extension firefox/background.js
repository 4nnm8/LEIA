var leia = {
  mode: 1,
  pred: 0,
//  high: 0,
// bgColor: "#ff0000",
//  txtColor: "#000000",
//  fontWeight: "normal",
//  txtDeco: "none"
}
function onError(e) {
  console.error(e);
}
function handleClick() {
  browser.runtime.openOptionsPage();
}
function checkStoredSettings(storedSettings) {
  if (!storedSettings.leia) {
    browser.storage.local.set({leia});
  }
}
var gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
browser.browserAction.onClicked.addListener(handleClick);
browser.runtime.onMessage.addListener(handleClick);