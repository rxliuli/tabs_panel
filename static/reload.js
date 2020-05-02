const id = '<extension_id here>'
function reloadExtension(id) {
  chrome.management.setEnabled(id, false, function () {
    chrome.management.setEnabled(id, true)
  })
}
chrome.browserAction.onClicked.addListener(function () {
  reloadExtension(id)
})
