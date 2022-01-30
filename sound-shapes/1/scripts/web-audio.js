const slider = document.getElementById('slider1');

var context = new AudioContext();

function Modulator (type, freq, gain) {
  this.modulator = context.createOscillator();
  this.gain = context.createGain();
  this.modulator.type = type;
  this.modulator.frequency.value = freq;
  this.gain.gain.value = gain;
  this.modulator.connect(this.gain);
  this.modulator.start(0);
}

// Make a stack of modulator
var modulatorStackNode = [
    // new Modulator("sawtooth", 0.01*Math.random(), 200*Math.random()),
    // new Modulator("square", 0.1*Math.random(), 200*Math.random()),
    // new Modulator("sine", 1*Math.random(), 200*Math.random()),
    // new Modulator("square", 10*Math.random(), 200*Math.random()),
    // new Modulator("sine", 10*Math.random(), 200*Math.random())

    new Modulator("sine", 1000, 100),
    new Modulator("sine", 250, 100),
    new Modulator("square", 100, 100),
].reduce(function (input, output) {
   input.gain.connect(output.modulator.frequency);
    return output;
});

// Make an oscillator, connect the modulator stack, play it!
var osc = context.createOscillator();
osc.type = "sine";
osc.frequency.value = 100+4*slider.value;
modulatorStackNode.gain.connect(osc.frequency);

var filter = context.createBiquadFilter();
filter.frequency.value = 2000;
filter.Q.value = 10;
osc.connect(filter);
filter.connect(context.destination);

osc.start(0);
