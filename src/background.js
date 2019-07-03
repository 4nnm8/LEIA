var leia = {mode:1,pred:0,high:0,styl:"emph4"}
browser.storage.local.get().then(function(s){
  !s.leia && browser.storage.local.set({leia});
}, function(e){
  console.error(e);
});
browser.browserAction.onClicked.addListener(function(){browser.runtime.openOptionsPage()});