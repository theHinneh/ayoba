require("browser-env")(["window", "navigator", "Android"]);
const opera = (window as any).opera;

export const AyobaAppApi = () => {
  var userAgent: any = navigator.userAgent || navigator.vendor || opera;

  // // Windows Phone must come first because its UA also contains "Android"
  // if (/windows phone/i.test(userAgent)) {
  //   return null;
  // }

  // if (/android/i.test(userAgent)) {
  //   return "Android";
  // }

  // // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //   return null; // todo
  // }

  return userAgent;
};
