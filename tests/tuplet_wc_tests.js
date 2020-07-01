Vex.Flow.Test.TupletWebComponents = (function() {
  var TupletWebComponents = {
    Start: function() {
      QUnit.module('Tuplet: WebComponents');
      Vex.Flow.Test.runNodeWebComponentTest('Simple Tuplet', TupletWebComponents.simple);
      Vex.Flow.Test.runNodeWebComponentTest('Beamed Tuplet', TupletWebComponents.beamed);
      Vex.Flow.Test.runNodeWebComponentTest('Ratioed Tuplet', TupletWebComponents.ratio);
      Vex.Flow.Test.runNodeWebComponentTest('Bottom Ratioed Tuplet', TupletWebComponents.bottom_ratio);
      Vex.Flow.Test.runNodeWebComponentTest('Complex Tuplet', TupletWebComponents.complex);
      Vex.Flow.Test.runNodeWebComponentTest('Mixed Stem Direction Tuplet', TupletWebComponents.mixedTop);
      Vex.Flow.Test.runNodeWebComponentTest('Mixed Stem Direction Bottom Tuplet', TupletWebComponents.mixedBottom);
    },

    simple: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=360 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='3/4'>
              <vf-voice stem='up'>
                <vf-tuplet stem='up'>g4/q, a4, b4</vf-tuplet>
                <vf-tuplet stem='up'>b4/8, a4, g4</vf-tuplet>
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
            <vf-stave clef='treble' timeSig='3/8'>
              <vf-voice stem='up'>
                <vf-tuplet beamed stem='up'>B4/16, A4, G4</vf-tuplet>
                <vf-tuplet beamed stem='up'>A4/8, F4, A4, F4, A4, F4, G4</vf-tuplet>
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
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-tuplet ratioed stem='up'>f4/q, a4, b4</vf-tuplet>
                <vf-tuplet ratioed notesOccupied=4 beamed stem='up'>g4/8, e4, g4</vf-tuplet>
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
            <vf-stave clef='treble' timeSig='3/4'>
              <vf-voice stem='up'>
                <vf-tuplet stem='down'>f4/q, c4, g4</vf-tuplet>
                <vf-tuplet beamed stem='down'>d5/8, g3, b4</vf-tuplet>
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
            <vf-stave clef='treble' timeSig='5/8'>
              <vf-voice stem='up'>
                <vf-tuplet ratioed stem='down'>f4/q, c4, g4</vf-tuplet>
                <vf-tuplet ratioed notesOccupied=1 beamed stem='down'>d5/8, g5, b4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Bottom Ratioed');
    },

    complex: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=600 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-tuplet beamed stem='up'>b4/8., a4/16, g4/8</vf-tuplet>
                <vf-tuplet stem='up' numNotes=7 notesOccupied=4>a4/16, b4/16/r, g4/32, f4, g4, f4, a4/16, f4/8</vf-tuplet>
                <vf-tuplet stem='up' beamed notesOccupied=4>b4/8, a4, g4, b4, a4</vf-tuplet>
              </vf-voice>
              <vf-voice stem='down'>c4/q, c4, c4, c4</vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Complex');
    },

    // iffy test
    mixedTop: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=10 width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='9/4'>
              <vf-voice stem='up'>
                <vf-tuplet stem='up' notesOccupied=3>a4/q[stem="up"], c6[stem="down"]</vf-tuplet>
                <vf-tuplet stem='up' notesOccupied=3>a4/q, f5</vf-tuplet>
                <vf-tuplet stem='up' notesOccupied=3>a4/q[stem="down"], c6[stem="down"]</vf-tuplet>
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
            <vf-stave clef='treble' timeSig='9/4'>
              <vf-voice stem='up'>
                <vf-tuplet stem='up' notesOccupied=3>f3/q[stem="up"], a5[stem="down"]</vf-tuplet>
                <vf-tuplet stem='up' notesOccupied=3>a4/q, f3</vf-tuplet>
                <vf-tuplet stem='up' notesOccupied=3>a4/q[stem="down"], c4[stem="down"]</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Tuplet - Mixed Stem Direction Bottom');
    },

    insane: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} y=20 width=450 height=180 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-beam>g4/8, g5/8, c4/8, b5/8</vf-beam>
                <vf-beam>g4/8[stem="down"], a5[stem="down"], b4[stem="down"]</vf-beam>
                c4/8
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Insane');
    },

    lengthy: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} y=20 width=450 height=180 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='2/4'>
              <vf-voice stem='up'>
                <vf-beam>g4/8, g4, g4, a4</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Lengthy');
    },

    outlier: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} y=20 width=450 height=180 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-beam>g4/8[stem="up"], f4[stem="up"], d5[stem="up"], e4[stem="up"]</vf-beam>
                <vf-beam>d5/8[stem="down"], d5[stem="down"], c5[stem="down"], d5[stem="down"]</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Outlier');
    }
  };

  return TupletWebComponents;
})();