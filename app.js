import Vex from './src/index.js';

// EasyScore API Example

const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var vf = new VF.Factory({renderer: {elementId: 'boo'}});
var score = vf.EasyScore();
var system = vf.System();

score.set({
  time: '3/8'
});


system.addStave({
  voices: [
    score.voice(
      score.tuplet(score.beam((score.notes('B4/16, A4, G4', {stem: 'down'}))))
        .concat(
          score.tuplet(score.beam((score.notes('A4/8, F4, A4, F4, A4, F4, G4', {stem: 'down'})))))
    ),
    score.voice(score.notes('c5/8, e5, e5'))
  ]
}).addClef('treble').addTimeSignature('3/8');

vf.draw();
 
