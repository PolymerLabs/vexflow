Vex.Flow.Test.WebComponents = (function() {
  var WebComponents = {
    Start: function() {
      QUnit.module('WebComponents');
      Vex.Flow.Test.runTests('Basic', WebComponents.basic);
      Vex.Flow.Test.runTests('Two Staves', WebComponents.twoStaves);
      Vex.Flow.Test.runTests('Formatter: Multiple Staves - Justified', WebComponents.formatterMultipleStavesJustified);
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
      ok(true, 'Web Components: Basic');
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
      ok(true, 'Web Components: Two Staves');
    },

    formatterMultipleStavesJustified: function(options) {
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId} renderer='canvas' width=600 height=600 stavesPerLine=2>
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
      ok(true, 'Web Components: Formatter Multi Stave Justified');
    },
  };

  return WebComponents;
})();