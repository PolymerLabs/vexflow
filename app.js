import Vex from './src/index.js';

// EasyScore API Example

const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var vf = new VF.Factory({renderer: {elementId: 'boo'}});
var score = vf.EasyScore();
var system = vf.System();


system.addStave({
  voices: [
    score.voice(
      score.notes('C#5/q, B4, B4')
        .concat(
          score.tuplet((score.notes('A4/8, E4, C4'))))
    )
  ]
}).addClef('treble').addTimeSignature('4/4');

vf.draw();

score.voice(score.notes('C#5/q, (C#4 Eb4 Gn4)/q, A4').concat(score.beam(score.notes('G4/16, G4, G4, G4'))));

 vf.draw();
 
