/**
 * 处理命令
 */
chrome.commands.onCommand.addListener(function (command) {
  console.log('command: ', command)
  if (command === 'showPopupPanel') {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.browserAction.getPopup(
        {
          tabId: tabs[0].id,
        },
        (result) => {
          console.log(result)
        },
      )
    })
  }
})
