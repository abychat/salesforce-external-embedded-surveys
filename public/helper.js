var iframe = document.getElementById("myIframe");

// Adjusting the iframe height onload event
iframe.onload = function () {
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
};
