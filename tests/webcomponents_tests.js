Vex.Flow.Test.WebComponents = (function() {
  var WebComponents = {
    Start: function() {
      console.log('START: WEB COMPONENTS');
      QUnit.module('Web Components');
      Vex.Flow.Test.runTests('Basic', Vex.Flow.Test.WebComponents.basic);
    },

    basic: function(options) {
      // const div = document.createElement('DIV');
      // div.innerHTML = `
      //   <vf-score id=${options.scoreId}>
      //     <vf-system>
      //       <vf-stave clef='treble' timeSig='4/4'>
      //         <vf-voice>C4/q, D4, E4, F4</vf-voice>
      //       </vf-stave>
      //     </vf-system>  
      //   </vf-score>
      // `;
      // document.body.appendChild(div.firstChild);
      const template = document.createElement('template');
      template.innerHTML = `
        <vf-score id=${options.scoreId}>
          <vf-system>
            <vf-stave clef='treble' timeSig='4/4'>
              <vf-voice>C4/q, D4, E4, F4</vf-voice>
            </vf-stave>
          </vf-system>  
        </vf-score>
      `;
      document.body.appendChild(document.importNode(template.content, true));
      console.log('wrote to the inner html');
      console.log(document.querySelector('vf-score'));
      console.log(document.querySelector('vf-score').shadowRoot);
      ok(true, 'Web Components idk');
    },
  };

  return WebComponents;
})();