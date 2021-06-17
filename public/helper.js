const mobileCheck = function () {
  let check = false;
  if (WURFL.is_mobile === true && WURFL.form_factor === "Smartphone") {
    check = true;
  }
  return check;
};

const tabletCheck = function () {
  let check = false;
  if (WURFL.is_mobile === true && WURFL.form_factor === "Tablet") {
    check = true;
  }
  return check;
};

const safariCheck = function () {
  let check = false;
  if (WURFL.complete_device_name === "Apple Safari") {
    check = true;
  }
  return check;
};

const height = window.innerHeight - 100;
const modalHeight = height - 50;

const setModalDialogStyle = function (
  suppliedHeight,
  isMobile,
  isTablet,
  isSafari
) {
  const modalDialog = document.getElementById("modalDialog");
  let style = "";
  if (!isMobile && !isTablet && !isSafari) {
    style = "height:" + suppliedHeight + "px";
  } else if (isMobile) {
    style = "height:" + height + "px;width:370px;right:2px;bottom:80px;";
  } else if (isTablet) {
    style = "height:" + height + "px;";
  } else if (isSafari) {
    style =
      "height:" + (height > suppliedHeight ? suppliedHeight : height) + "px;";
  }
  modalDialog.style = style;
};

const setModalBodyStyle = function (
  suppliedHeight,
  isMobile,
  isTablet,
  isSafari
) {
  const modalBody = document.getElementById("modalBody");
  let style = "";
  if (!isMobile && !isTablet && !isSafari) {
    style = "height:" + suppliedHeight + "px";
  } else if (isMobile) {
    style =
      "height:" +
      height +
      "px;width:100%;padding-left: 0.5rem !important;overflow-y: auto";
  } else if (isTablet) {
    style = "height:" + height + "px;";
  } else if (isSafari) {
    style =
      "height:" + (height > suppliedHeight ? suppliedHeight : height) + "px;";
  }
  modalBody.style = style;
};

const setIframeStyle = function (suppliedHeight, isMobile, isTablet, isSafari) {
  const iframe = document.getElementById("myIframe");
  let style = "";
  if (!isMobile && !isTablet && !isSafari) {
    style = "height:" + suppliedHeight + "px";
  } else if (isMobile) {
    style = "width: 350px;height:" + modalHeight + "px;";
  } else if (isTablet) {
    style = "height:" + modalHeight + "px;";
  } else if (isSafari) {
    style =
      "height:" +
      (modalHeight > suppliedHeight ? suppliedHeight : modalHeight) +
      "px";
  }
  iframe.style = style;
};

const setBgImage = function (
  background,
  mobileBackground,
  isMobile,
  isTablet,
  isSafari
) {
  const bgimg = document.getElementById("bgimg");
  if (!isMobile && !isTablet && !isSafari) {
    bgimg.src = background;
  } else if (isTablet || isSafari) {
    bgimg.src = background;
  } else if (isMobile) {
    bgimg.src = mobileBackground;
  }
};

const setStyles = function (
  modalHeight,
  iframeHeight,
  background,
  mobileBackground
) {
  const isMobile = mobileCheck();
  const isTablet = tabletCheck();
  const isSafari = safariCheck();
  setBgImage(background, mobileBackground, isMobile, isTablet, isSafari);
  setModalDialogStyle(modalHeight, isMobile, isTablet, isSafari);
  setModalBodyStyle(modalHeight, isMobile, isTablet, isSafari);
  setIframeStyle(iframeHeight, isMobile, isTablet, isSafari);
};
