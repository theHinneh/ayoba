require("browser-env")(["window", "navigator", "Android"]);

const agent = (navigator as any).userAgent;
const vendor = (navigator as any).vendor;
const opera = (window as any).opera;
// import browserEnv from "browser-env";
// browserEnv(["navigator"]);

class AyobaApi {
  //   Android: any;
  getAyoba() {
    var userAgent: any = navigator.userAgent || navigator.vendor || opera;
    console.log("userAgent", userAgent);

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return null;
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return null; // todo
    }

    return "unknown";
  }
}

const Ayoba = new AyobaApi();
export const AyobaAppApi = Ayoba.getAyoba();
