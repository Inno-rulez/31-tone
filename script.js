// Create an audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Object to store all the oscillator and button pairs
const pairs = {};

// Function to create an oscillator for a given frequency
function createOscillator(frequency) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.connect(audioContext.destination);
  return oscillator;
}

// Function to play a tone when the button is pressed
function startTone(buttonId, frequency) {
  const oscillator = createOscillator(frequency);
  oscillator.start();
  pairs[buttonId] = { button: document.getElementById(buttonId), oscillator: oscillator };
  pairs[buttonId].button.addEventListener('mouseup', () => stopTone(buttonId));
  pairs[buttonId].button.addEventListener('mouseleave', () => stopTone(buttonId));
}

// Function to stop a tone when the button is released
function stopTone(buttonId) {
  pairs[buttonId].oscillator.stop();
  pairs[buttonId].button.removeEventListener('mouseup', () => stopTone(buttonId));
  pairs[buttonId].button.removeEventListener('mouseleave', () => stopTone(buttonId));
  delete pairs[buttonId];
}
