"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyobaAppApi = void 0;
require("browser-env")(["window", "navigator"]);
var agent = navigator.userAgent;
var vendor = navigator.vendor;
var opera = window.opera;
// import browserEnv from "browser-env";
// browserEnv(["navigator"]);
var AyobaApi = /** @class */ (function () {
    function AyobaApi() {
    }
    AyobaApi.prototype.getAyoba = function () {
        var userAgent = agent || vendor || opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return null;
        }
        if (/android/i.test(userAgent)) {
            return this.Android;
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return null; // todo
        }
        return "unknown";
    };
    return AyobaApi;
}());
var Ayoba = new AyobaApi();
exports.AyobaAppApi = Ayoba.getAyoba();
