// require("browser-env")(["window", "navigator", "Android"]);
// const opera = (window as any).opera;

export function getAyoba() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // // Windows Phone must come first because its UA also contains "Android"
  // if (/windows phone/i.test(userAgent)) {
  //   return null;
  // }

  if (/(android)/i.test(userAgent)) {
    console.log("device is an android");

    return navigator.userAgent;
  }

  // // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //   return null; // todo
  // }

  return userAgent;
}