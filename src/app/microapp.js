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

const onNicknameChanged = (nickname) => {
  document.getElementById("nicknameInputText").innerHTML = nickname;
  return nickname;
};

const onAvatarChanged = (avatarPath) => {
  document.getElementById("avatarImage").src = avatarPath;
  return avatarPath;
};

const getCountry = () => {
  var country = Ayoba.getCountry();
  return country;
};

export { Ayoba, onNicknameChanged, onAvatarChanged, getCountry };
// export default Ayoba

// window.alert("file Loaded");
