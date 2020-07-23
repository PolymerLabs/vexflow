Vex.Flow.Test.BeamWebComponents = (function() {
  var BeamWebComponents = {
    Start: function() {
      QUnit.module('Beam: WebComponents');
      Vex.Flow.Test.runTests('Simple Beam', BeamWebComponents.simple);
      Vex.Flow.Test.runTests('Multi Beam', BeamWebComponents.multi);
      Vex.Flow.Test.runTests('Sixteenth Beam', BeamWebComponents.sixteenth);
      Vex.Flow.Test.runTests('Slopey Beam', BeamWebComponents.slopey);
      Vex.Flow.Test.runTests('Mixed Beam 2', BeamWebComponents.mixed2);
      Vex.Flow.Test.runTests('Dotted Beam', BeamWebComponents.dotted);
      Vex.Flow.Test.runTests('Partial Beam', BeamWebComponents.partial);
      Vex.Flow.Test.runTests('Close Trade-offs Beam', BeamWebComponents.tradeoffs);
      Vex.Flow.Test.runTests('Insane Beam', BeamWebComponents.insane);
      Vex.Flow.Test.runTests('Lengthy Beam', BeamWebComponents.lengthy);
      Vex.Flow.Test.runTests('Outlier Beam', BeamWebComponents.outlier);
    },

    simple: function(options) {
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
      ok(true, 'Web Components: Beam - Simple');
    },

    multi: function(options) {
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

    sixteenth: function(options) {
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
    },

    slopey: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} y=20 width=350 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-beam stem='up'>c4/8, f4/8, d5/8, g5/8</vf-beam>
                <vf-beam stem='up'>d6/8, f5/8, d4/8, g3/8</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Slopey');
    },

    mixed2: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} y=20 width=450 height=180 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='31/64'>
              <vf-voice stem='up'>
                <vf-beam>f5/32, d5/16, c5/32, c5/64, d5/128, e5/8, f5/16, d5/32, c5/64, c5/32, d5/16, e5/128</vf-beam>
              </vf-voice>
              <vf-voice stem='down'>
                <vf-beam stem='down'>f4/32, d4/16, c4/32, c4/64, d4/128, e4/8, f4/16, d4/32, c4/64, c4/32, d4/16, e4/128</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Mixed2');
    },

    dotted: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='6/4'>
              <vf-voice stem='up'>
                <vf-beam>d4/8, b3/8., a3/16, a3/8</vf-beam>
                <vf-beam>b3/8., c4/16, d4/8, b3/8</vf-beam>
                <vf-beam>a3/8., a3/16, b3/8., c4/16</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Dotted');
    },

    partial: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='89/64'>
              <vf-voice stem='up'>
                <vf-beam>d4/8, b3/32, c4/16.</vf-beam>
                <vf-beam>d4/16., e4/8, c4/64, c4/32, a3/8., b3/32.</vf-beam>
                <vf-beam>c4/8, e4/64, b3/16., b3/64</vf-beam>
                <vf-beam>f4/8, e4/8, g4/64, e4/8</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Partial');
    },

    tradeoffs: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} width=450 height=140 renderer='canvas'>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice stem='up'>
                <vf-beam>a4/8, b4/8, c4/8, d4/8</vf-beam>
                <vf-beam>g4/8, a4/8, b4/8, c4/8</vf-beam>
              </vf-voice>
            </vf-stave>
          </vf-system>
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      ok(true, 'Web Components: Beam - Close Trade-offs');
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

  return BeamWebComponents;
})();
