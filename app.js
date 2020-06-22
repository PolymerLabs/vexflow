import Vex from './src/index.js';

const VF = Vex.Flow;

var vf = new VF.Factory({renderer: {elementId: 'boo'}});
var score = vf.EasyScore();
var system = vf.System();

var registry = new VF.Registry();
VF.Registry.enableDefaultRegistry(registry);

function id(id) { return registry.getElementById(id); }

score.set({
  time: '3/8'
});

system.addStave({
  voices: [
    score.voice(
      score.tuplet(
        score.beam(
          score.notes('B4/16, A4[id="start"], G4', {stem: 'down'})
        ), 
        {location: -1}
      ).concat(
      score.tuplet(
        score.beam(
          score.notes('A4/8, F4, A4[id="end"], F4, A4, F4', {stem: 'down'})
        ), 
        {location: -1}
      ))
    ),
    score.voice(score.notes('d5/4, e5/8', {stem: 'up'}))
  ]
}).addClef('treble').addTimeSignature('3/8');

vf.Curve({
  from: id('start'),
  to: id('end'),
});

vf.draw();