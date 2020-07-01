Vex.Flow.Test.WebComponents = (function() {
  var WebComponents = {
    Start: function() {
      QUnit.module('WebComponents');
      Vex.Flow.Test.runTests('Basic', Vex.Flow.Test.WebComponents.basic);
      Vex.Flow.Test.runTests('Two Staves', Vex.Flow.Test.WebComponents.twoStaves);
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
  };

  return WebComponents;
})();