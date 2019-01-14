chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var redirects, pattern, from, to, redirecUrl;
    redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
    for (var i=0; i<redirects.length; i++) {
      if (!redirects[i][2]) continue;
      from = redirects[i][0];
      to = redirects[i][1];
      try {
        pattern = new RegExp(from, 'ig');
      } catch(err) {
        //bad pattern
        continue;
      }
      match = details.url.match(pattern);
      if (match) {
        redirectUrl = details.url.replace(pattern, to);
        if (redirectUrl != details.url) {
          return {redirectUrl: redirectUrl};
        }
      }
    }
    return {};
  },
  {
    urls: [
      "<all_urls>",
    ],
    types: ["main_frame", "xmlhttprequest"]
  },
  ["blocking"]
);
