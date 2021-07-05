"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyobaAppApi = void 0;
require("browser-env")(["window", "navigator", "Android"]);
var opera = window.opera;
var AyobaAppApi = function () {
    var userAgent = navigator.userAgent || navigator.vendor || opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }
    if (/android/i.test(userAgent)) {
        return Android;
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo
    }
    return userAgent;
};
exports.AyobaAppApi = AyobaAppApi;
