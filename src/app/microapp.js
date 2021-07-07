window["Android"];

function getAyoba() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

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

  return "unknown";
}

const Ayoba = getAyoba();

let nickName = "";

function onNicknameChanged(nickname) {
  document.getElementById("nicknameInputText").innerHTML = nickname;
  nickName = nickname;
}

function onAvatarChanged(avatarPath) {
  document.getElementById("avatarImage").src = avatarPath;
}

export { Ayoba, nickName };
// export default Ayoba

// window.alert("file Loaded");
