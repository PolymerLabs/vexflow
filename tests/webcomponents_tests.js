Vex.Flow.Test.WebComponents = (function() {
  var WebComponents = {
    Start: function() {
      QUnit.module('WebComponents');
      Vex.Flow.Test.runTests('Basic', Vex.Flow.Test.WebComponents.basic);
      Vex.Flow.Test.runTests('Two Staves', Vex.Flow.Test.WebComponents.twoStaves);
      // Vex.Flow.Test.runTests('Formatter: Multiple Staves - Justified', Vex.Flow.Test.WebComponents.formatterMultipleStavesJustified);
    },

    basic: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice>C4/q, D4, E4, F4</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components idk');
    },

    twoStaves: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
      <vf-score id=${options.scoreId} renderer='canvas'>
        <vf-system>
          <vf-stave clef='treble' timeSig='4/4'>
            <vf-voice>C4/q, D4, E4, F4</vf-voice>
          </vf-stave>
          <vf-stave clef='bass' timeSig='4/4'>
            <vf-voice>G2/q, A2, B2, C3</vf-voice>
          </vf-stave>
        </vf-system>  
      </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components 2');
    },

    formatterMultipleStavesJustified: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
      <vf-score id=${options.scoreId} renderer='canvas' width=600 height=400 stavesPerLine=2>
        <vf-system>
          <vf-stave clef='treble' timeSig='6/8'>
            <vf-voice>f4/4, d4/8, g4/4, eb4/8</vf-voice>
          </vf-stave>
        </vf-system> 

        <vf-system>
          <vf-stave>
            <vf-voice stem='down'>ab4/4, bb4/8, (cb5 eb5)/4[stem="down"], d5/8[stem="down"]</vf-voice>
          </vf-stave>
        </vf-system>  

        <vf-system connected>
          <vf-stave clef='treble' timeSig='6/8'>
            <vf-voice>
              <vf-beam>d4/8, d4, d4</vf-beam>
              <vf-beam>d4/8, e4, eb4</vf-beam>
            </vf-voice>
          </vf-stave>
          <vf-stave clef='bass' timeSig='6/8'>
            <vf-voice stem='down'>
              <vf-beam stem='down'>c4/8, c4, c4</vf-beam>
              <vf-beam stem='down'>c4/8, c4, c4</vf-beam>
            </vf-voice>
          </vf-stave>
        </vf-system>

        <vf-system>
          <vf-stave>
            <vf-voice>(eb4 ab4)/4., (c4 eb4 ab4)/4, db5/8</vf-voice>
          </vf-stave>
          <vf-stave>
            <vf-voice stem='down'>
              <vf-beam stem='down'>c4/8, c4, c4</vf-beam>
              <vf-beam stem='down'>c4/8, c4, c4</vf-beam>
            </vf-voice>
          </vf-stave>
        </vf-system>
      </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: formatter mult stave justified');
    },

    beamSimple: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='2/2'>
              <vf-voice stem='up'>
                (cb4 e#4 a4)/2
                <vf-beam stem='up'>(cb4 e#4 a4)/8, (d4 f4 a4), (ebb4 g##4 b4), (f4 a4 c5)</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam: simple');
    },

    beamMulti: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-beam stem='up'>f5/8, e5, d5, c5</vf-beam>
                <vf-beam stem='up'>c5, d5, e5, f5</vf-beam>
              </vf-voice>
              <vf-voice>
                <vf-beam stem='down'>f4/8, e4, d4, c4</vf-beam>
                <vf-beam stem='down'>c4/8, d4, e4, f4</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Multi');
    },

    beamSixteenth: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-beam stem='up'>f5/16, f5, d5, c5</vf-beam>
                <vf-beam stem='up'>c5/16, d5, f5, e5</vf-beam>
                f5/2
              </vf-voice>
              <vf-voice stem='down'>
                <vf-beam stem='down'>f4/16, e4/16, d4/16, c4/16</vf-beam>
                <vf-beam stem='down'>c4/16, d4/16, f4/16, e4/16</vf-beam>
                f4/2
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Sixteenth');
    }
  };

  return WebComponents;
})();