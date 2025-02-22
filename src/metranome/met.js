const get = str => document.querySelector(str);
const wait = seconds => new Promise(r => setTimeout(r, seconds * 1e3));

const context = new AudioContext();   
let cntr = 0;
const makeSound = () => {
  const sound = context.createOscillator();
  const fourthBeat = cntr++ % 4 === 0;
  sound.frequency.value = fourthBeat ? 400 : 440;
  sound.connect(context.destination);
  sound.start(context.currentTime);
  sound.stop(context.currentTime + .1);
};

let bpm = 60;
get("input").addEventListener("input", e => {
  bpm = e.target.value;
  get(".display").innerText = bpm;
});

let running = true;
get(".start").addEventListener("click", async () => {
  running = true;
  get(".start").disabled = true;
  while (running) {
    makeSound();    
    await wait(60 / bpm);
  }
});

get(".stop").addEventListener("click", () => {
  running = false
  get(".start").disabled = false;
  cntr = 0;
});