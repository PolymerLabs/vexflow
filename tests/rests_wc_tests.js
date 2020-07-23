Vex.Flow.Test.RestsWebComponents = (function() {
  var RestsWebComponents = {
    Start: function() {
      QUnit.module('Rests: WebComponents');
      Vex.Flow.Test.runTests('Auto Align Rests - Beamed Notes Stems Up', RestsWebComponents.beamsUp);
      Vex.Flow.Test.runTests('Auto Align Rests - Beamed Notes Stems Down', RestsWebComponents.beamsDown);
      Vex.Flow.Test.runTests('Auto Align Rests - Tuplets Stems Up', RestsWebComponents.tupletsUp);
      Vex.Flow.Test.runTests('Auto Align Rests - Single Voice (Default)', RestsWebComponents.staveRests);
      Vex.Flow.Test.runTests('Auto Align Rests - Multi Voice (Default)', RestsWebComponents.multi);
    },

    beamsUp: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=30 width=600 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='6/4'>
              <vf-voice stem='up'>
                <vf-beam>e5/8, b4/r, b5, c5</vf-beam> 
                <vf-beam>(b4 d5 a5), b4/r, b4/r, c4</vf-beam>
                <vf-beam>(b4 d5 a5), b4, b4/r, c4</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Align Rests - Beams Up');
    },

    beamsDown: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=30 width=600 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='6/4'>
              <vf-voice stem='down'>
                <vf-beam stem='down'>a5/8, b4/r, b5, c5</vf-beam> 
                <vf-beam stem='down'>(b4 d5 a5), b4/r, b4/r, e4</vf-beam>
                <vf-beam stem='down'>(b4 d5 a5), b4, b4/r, e4</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Align Rests - Beams Down');
    },

    tupletsUp: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=30 width=600 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='8/4'>
              <vf-voice stem='down'>
                <vf-tuplet stem='up'>b4/q, b4, a5/r</vf-tuplet>
                <vf-tuplet stem='up'>a5/q/r, g5/r, b5</vf-tuplet>
                <vf-tuplet stem='up'>a5/q, g5/r, b4</vf-tuplet>
                <vf-tuplet stem='up'>a5/q, b4/r, b4</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Align Rests - Tuplets Stem Up Test');
    },

    tupletsDown: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=30 width=600 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='down'>
                <vf-tuplet beamed stem='down'>a5/8/r, g5/r, b4</vf-tuplet>
                <vf-tuplet beamed stem='down'>a5/8/r, g5, b5</vf-tuplet>
                <vf-tuplet beamed stem='down'>a5/8, g5/r, b4</vf-tuplet>
                <vf-tuplet beamed stem='down'>a5/8, g5/r, b4/r</vf-tuplet>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Align Rests - Tuplets Stem Down Test');
    },

    staveRests: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=10 y=30 width=600 height=160 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='12/4'>
              <vf-voice stem='down'>
                b4/q/r, b4/r, f4, e5/8, b4/r
                <vf-beam stem='down'>a5/8, b4/r, b4, e5</vf-beam>
                <vf-tuplet stem='up'>a5/q, b4/r, b5</vf-tuplet>
                d5/q, g5, b4/r, b4/r
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Align Rests - Default Test');
    },

    multi: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} x=50 y=10 width=600 height=200 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>(c4 e4 g4)/q, b4/r, (c4 d4 a4), b4/r</vf-voice>
              <vf-voice>
                <vf-beam stem='down'>e3/8, b4/r, b4/r, e3</vf-beam>
                <vf-beam stem='down'>e3/8, b4/r, e3, e3</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Auto Align Rests - Multi Voice Default Test');
    }
  };

  return RestsWebComponents;
})();
