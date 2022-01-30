
const synth = new Tone.FMSynth().toMaster()
const synth2 = new Tone.FMSynth().toMaster()
const synth3 = new Tone.FMSynth().toMaster()
const synth4 = new Tone.FMSynth().toMaster()
const synth5 = new Tone.FMSynth().toMaster()
// synth.triggerAttackRelease('C3', '8n')

const loopA = new Tone.Loop(time => {
  synth.triggerAttackRelease('C2', '2n', time);
}, "1n").start(0);
const loopB = new Tone.Loop(time => {
  synth2.triggerAttackRelease('A3', '8n', time);
}, "2n").start(0);
const loopC = new Tone.Loop(time => {
  synth3.triggerAttackRelease('G3', '12n', time);
}, "3n").start(0);
const loopD = new Tone.Loop(time => {
  synth4.triggerAttackRelease('E3', '16n', time);
}, "4n").start(0);
const loopE = new Tone.Loop(time => {
  synth5.triggerAttackRelease('C3', '48n', time);
}, "6n").start(0);

document.getElementById("play-button").addEventListener("click", function() {
  if (Tone.Transport.state !== 'started') {
    Tone.start();
  } else {
    Tone.Transport.stop();
  }
  synth.triggerAttackRelease('C3', '8n')
});

Tone.Transport.start();
