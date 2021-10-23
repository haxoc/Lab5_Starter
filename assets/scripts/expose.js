// expose.js
window.addEventListener('DOMContentLoaded', init);

const audioPath = './assets/audio/'
const imagePath = './assets/images/'
const jsConfetti = new JSConfetti()


var hornSelector = null;
var mainImage = null;
var mainAudio = null;
var volumeSlider = null;
var volumeImage = null;
var playButton = null;

function setAudioFile(filePath) {
  mainAudio.src = filePath;
}

function setImage(imgElement, filePath) {
  imgElement.src = filePath
}

function changedHorn() {
  let selection = hornSelector.value;
  let audioFilePath = audioPath + selection + '.mp3';
  let imageFilePath = imagePath + selection + '.svg';
  setAudioFile(audioFilePath);
  setImage(mainImage, imageFilePath);
  if (hornSelector.value == 'party-horn') {
    jsConfetti.addConfetti();
  }
}

function adjustedVolume() {
  let volValue = volumeSlider.value;
  volumeSlider.value = volValue;
  let imageFilePath = './assets/icons/';

  if (volValue == 0) {
    imageFilePath += 'volume-level-0.svg';
  } else if (volValue < 33) {
    imageFilePath += 'volume-level-1.svg';
  } else if (volValue < 67) {
    imageFilePath += 'volume-level-2.svg';
  } else {
    imageFilePath += 'volume-level-3.svg';
  }

  setImage(volumeImage, imageFilePath);
  mainAudio.volume = volValue / 100;
}

function clickedPlay() {
  mainAudio.play();
}

function init() {
  volumeImage = document.querySelector('#volume-controls > img');
  volumeSlider = document.querySelector('#volume-controls > input');
  volumeSlider.addEventListener('change', adjustedVolume);

  mainImage = document.querySelector('#expose > img');
  mainAudio = document.querySelector('#expose > audio');

  hornSelector = document.getElementById('horn-select');
  hornSelector.addEventListener('change', changedHorn);

  playButton = document.querySelector('#expose > button');
  playButton.addEventListener('click', clickedPlay);

  changedHorn();
  adjustedVolume();
}