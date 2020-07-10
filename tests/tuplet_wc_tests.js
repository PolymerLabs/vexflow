Vex.Flow.Test.TupletWebComponents = (function() {
  var TupletWebComponents = {
    Start: function() {
      QUnit.module('Tuplet: WebComponents');
      Vex.Flow.Test.runTests('Simple Tuplet', TupletWebComponents.simple);
      Vex.Flow.Test.runTests('Beamed Tuplet', TupletWebComponents.beamed);
      Vex.Flow.Test.runTests('Ratioed Tuplet', TupletWebComponents.ratio);
      Vex.Flow.Test.runTests('Bottom Ratioed Tuplet', TupletWebComponents.bottom_ratio);
      Vex.Flow.Test.runTests('Complex Tuplet', TupletWebComponents.complex);
      Vex.Flow.Test.runTests('Mixed Stem Direction Tuplet', TupletWebComponents.mixedTop);
      Vex.Flow.Test.runTests('Mixed Stem Direction Bottom Tuplet', TupletWebComponents.mixedBottom);
    },

    simple: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=360 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='3/4'>
              <vf-voice>
                <vf-tuplet>g4/q, a4, b4</vf-tuplet>
                <vf-tuplet>b4/8, a4, g4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Simple');
    },

    beamed: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=360 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='3/8'>
              <vf-voice>
                <vf-tuplet beamed>B4/16, A4, G4</vf-tuplet>
                <vf-tuplet beamed>A4/8, F4, A4, F4, A4, F4, G4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Beamed');
    },

    ratio: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=360 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='4/4'>
              <vf-voice>
                <vf-tuplet ratioed=true>f4/q, a4, b4</vf-tuplet>
                <vf-tuplet ratioed=true notesOccupied=4 beamed>g4/8, e4, g4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Ratioed');
    },

    bottom: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=350 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='3/4'>
              <vf-voice stem='down'>
                <vf-tuplet location='below'>f4/q, c4, g4</vf-tuplet>
                <vf-tuplet location='below' beamed>d5/8, g3, b4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Bottom');
    },

    bottom_ratio: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=350 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='5/8'>
              <vf-voice stem='down'>
                <vf-tuplet location='below' ratioed=true>f4/q, c4, g4</vf-tuplet>
                <vf-tuplet location='below' ratioed=true notesOccupied=1 beamed>d5/8, g5, b4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Bottom Ratioed');
    },

    // Middle tuplet (beam within tuplet) is off 
    complex: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=600 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-tuplet beamed>b4/8., a4/16, g4/8</vf-tuplet>
                <vf-tuplet ratioed=false numNotes=7 notesOccupied=4>a4/16, b4/16/r, g4/32, f4, g4, f4, a4/16, f4/8</vf-tuplet>
                <vf-tuplet beamed notesOccupied=4>b4/8, a4, g4, b4, a4</vf-tuplet>
              </vf-voice>
              <vf-voice stem='down'>c4/q, c4, c4, c4</vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Complex');
    },

    mixedTop: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='9/4'>
              <vf-voice>
                <vf-tuplet notesOccupied=3>a4/q, c6[stem="down"]</vf-tuplet>
                <vf-tuplet notesOccupied=3>a4/q, f5</vf-tuplet>
                <vf-tuplet notesOccupied=3>a4/q[stem="down"], c6[stem="down"]</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Mixed Stem Direction');
    },

    mixedBottom: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave timeSig='9/4'>
              <vf-voice>
                <vf-tuplet notesOccupied=3>f3/q, a5[stem="down"]</vf-tuplet>
                <vf-tuplet notesOccupied=3>a4/q, f3</vf-tuplet>
                <vf-tuplet notesOccupied=3>a4/q[stem="down"], c4[stem="down"]</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Mixed Stem Direction Bottom');
    }
  };

  return TupletWebComponents;
})();