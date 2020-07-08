/**
 * VexFlow - Auto-beaming Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

var VF = Vex.Flow;
VF.Test.AutoBeamFormattingWebComponents = (function() {
  var AutoBeamFormattingWebComponents = {
    Start: function() {
      var runTests = VF.Test.runTests;
      QUnit.module('Auto-Beaming: WebComponents');
      runTests('Simple Auto Beaming', AutoBeamFormattingWebComponents.simpleAuto);
      // runTests('Auto Beaming With Overflow Group', AutoBeamFormattingWebComponents.simpleAutoWithOverflowGroup); -- stem direction is off
      runTests('Even Group Stem Directions', AutoBeamFormattingWebComponents.evenGroupStemDirections);
      runTests('More Simple Auto Beaming 0', AutoBeamFormattingWebComponents.moreSimple0);
      runTests('More Simple Auto Beaming 1', AutoBeamFormattingWebComponents.moreSimple1);
      // runTests('Odd Time - Guessing Default Beam Groups', AutoBeamFormattingWebComponents.autoOddBeamGroups); // groups are off
      // runTests('Simple Tuplet Auto Beaming', AutoBeamFormattingWebComponents.simpleTuplets);
      // runTests('More Simple Tuplet Auto Beaming', AutoBeamFormattingWebComponents.moreSimpleTuplets);
      // runTests('More Automatic Beaming', AutoBeamFormattingWebComponents.moreBeaming); -- groups are off
    },

    simpleAuto: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice autoBeam>f5/8, e5, d5, c5/16, c5, d5/8, e5, f5, f5/32, f5, f5, f5</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Beaming Applicator Test');
    },

    // stem direction is off
    // simpleAutoWithOverflowGroup: function(options) {
    //   var vf = VF.Test.makeFactory(options);
    //   var stave = vf.Stave();
    //   var score = vf.EasyScore();

    //   var voice = score.voice(score.notes(
    //     'f5/4., e5/8, d5/8, d5/16, c5/16, c5/16, c5/16, f5/16, f5/32, f5/32'
    //   ), { time: '4/4' });

    //   // Takes a voice and returns it's auto beamsj
    //   var beams = VF.Beam.applyAndGetBeams(voice);

    //   vf.Formatter()
    //     .joinVoices([voice])
    //     .formatToStave([voice], stave);

    //   vf.draw();

    //   beams.forEach(function(beam) {
    //     return beam.setContext(vf.getContext()).draw();
    //   });

    //   ok(true, 'Auto Beaming Applicator Test');
    // },

    evenGroupStemDirections: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='6/4'>
              <vf-voice autoBeam>a4/8, b4, g4, c5, f4, d5, e4, e5, b4, b4, g4, d5</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));

      // TODO: figure out how to test this with web components?
      // var UP = VF.Stem.UP;
      // var DOWN = VF.Stem.DOWN;
      // equal(beams[0].stem_direction, UP);
      // equal(beams[1].stem_direction, UP);
      // equal(beams[2].stem_direction, UP);
      // equal(beams[3].stem_direction, UP);
      // equal(beams[4].stem_direction, DOWN);
      // equal(beams[5].stem_direction, DOWN);

      ok(true, 'Web Components: Auto Beaming Applicator Test');
    },

    moreSimple0: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice autoBeam>c4/8, g4, c5, g5, a5, c4, d4, a5</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Beaming Applicator Test');
    },

    moreSimple1: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 y=10 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice autoBeam>c5/16, g5, c5, c5/r, c5/r, (c4 e4 g4), d4, a5, c4, g4, c5, b4/r, (c4 e4), b4/r, b4/r, a4</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Beaming Applicator Test');
    },

  // beam groups are off
    // autoOddBeamGroups: function(options) {
    //   const template = document.createElement('template');
    //   template.innerHTML = `
    //     <vf-score id=${options.scoreId} width=450 height=600 renderer='canvas'>
    //       <vf-system>
    //         <vf-stave clef='treble' timeSig='5/4'>
    //           <vf-voice autoBeam>c5/8, g5, c5, b4, b4, c4, d4, a5, c4, g4</vf-voice>
    //         </vf-stave>
    //       </vf-system>  
    //       <vf-system>
    //         <vf-stave clef='treble' timeSig='5/8'>
    //           <vf-voice autoBeam>c5/8, g5, c5, b4, b4</vf-voice>
    //         </vf-stave>
    //       </vf-system>  
    //       <vf-system>
    //         <vf-stave clef='treble' timeSig='13/16'>
    //           <vf-voice autoBeam>c5/16, g5, c5, b4, b4, c5, g5, c5, b4, b4, c5, b4, b4</vf-voice>
    //         </vf-stave>
    //       </vf-system>  
    //     </vf-score>
    //   `;
    //   document.body.appendChild(document.importNode(template.content, true));
    //   ok(true, 'Web Components: Auto Beaming Applicator Test');
    // },

    simpleTuplets: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 y=10 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice autoBeam>c5/16, g5, c5, c5/r, c5/r, (c4 e4 g4), d4, a5, c4, g4, c5, b4/r, (c4 e4), b4/r, b4/r, a4</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Beaming Applicator Test');
    },

    moreSimpleTuplets: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='3/4'>
              <vf-voice autoBeam>
                <vf-tuplet stem='up'>d4/4, g4, c5</vf-tuplet>
                g5/16, a5, a5, (c5 e5)
              </vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Beaming Applicator Test');
    },
  };

    // groups are diff
    // moreBeaming: function(options) {
    //   var vf = VF.Test.makeFactory(options);
    //   var stave = vf.Stave();
    //   var score = vf.EasyScore();

    //   var voice = score.voice(score.notes(
    //     'c4/8, g4/4, c5/8., g5/16, a5/4, a5/16, (c5 e5)/16, a5/8'
    //   ), { time: '9/8' });

    //   var beams = VF.Beam.applyAndGetBeams(voice, undefined, VF.Beam.getDefaultBeamGroups('9/8'));

    //   vf.Formatter()
    //     .joinVoices([voice])
    //     .formatToStave([voice], stave);

    //   vf.draw();

    //   beams.forEach(function(beam) {
    //     return beam.setContext(vf.getContext()).draw();
    //   });

    //   ok(true, 'Auto Beam Applicator Test');
    // },

  return AutoBeamFormattingWebComponents;
})();
