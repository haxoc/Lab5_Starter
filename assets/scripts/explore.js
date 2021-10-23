// explore.js

var speechSynthesis = window.speechSynthesis;
window.addEventListener('DOMContentLoaded', init);
var voicesSelector = null;
var playButton = null;
var textArea = null;
var emojiPic = null;
var voicesList = []

function addVoiceOption(voice) {
  // from MDN https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis
  let option = document.createElement('option');
  option.textContent = voice.name + ' (' + voice.lang + ')';
  option.value = voice.name
  voicesSelector.appendChild(option);
}

speechSynthesis.getVoices();
speechSynthesis.onvoiceschanged = function() {
  voicesList = speechSynthesis.getVoices();
  voicesList.forEach(addVoiceOption);
};

function findInVoicesArray(voiceName) {
  for (const voice of voicesList) {
    if (voiceName == voice.name) {
      return voice;
    }
  }
}

function setEmojiStart() {
  emojiPic.src = 'assets/images/smiling-open.png'
}

function setEmojiEnd() {
  emojiPic.src = 'assets/images/smiling.png'
}

function playClicked(){
  var utterThis = new SpeechSynthesisUtterance(textArea.value);
  var selectedVoiceName = voicesSelector.selectedOptions[0].value;
  let voiceObj = findInVoicesArray(selectedVoiceName);
  utterThis.voice = voiceObj;
  utterThis.addEventListener('start', setEmojiStart);
  utterThis.addEventListener('end', setEmojiEnd);
  speechSynthesis.speak(utterThis);
}

function init() {
  emojiPic = document.querySelector('#explore > img')
  voicesSelector = document.getElementById('voice-select');
  playButton = document.querySelector('#explore > button');
  textArea = document.getElementById('text-to-speak');
  playButton.addEventListener('click', playClicked);
}