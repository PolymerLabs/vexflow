import Vex from '../src/index.js';
import './vf-score';

const template = document.createElement('template');
template.innerHTML = `
  <slot></slot>
`;


export class VFSystem extends HTMLElement {
  constructor() {
    super();

    this.staves = [];
    this.staveOrder = new Set();
    this.staveMap = new Map();

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.addEventListener('staveCreated', this.staveCreated);
  }

  connectedCallback() {
    const getFactoryEvent = new CustomEvent('getFactory', { bubbles: true, detail: { factory: null } });
    this.dispatchEvent(getFactoryEvent);
    this.vf = getFactoryEvent.detail.factory;

    // this.setupSystem();

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.registerStaves);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.registerStaves);
  }

  setupSystem(x) {
    this.x = x;
    this.system = this.vf.System({ 
      x: x,
      y: 40, 
      width: parseInt(this.getAttribute('width')) || 400,
      factory: this.vf 
    });
  }

  registerStaves = () => {
    const staves = this.shadowRoot.querySelector('slot').assignedElements();
    this.numStaves = staves.length;
    staves.forEach(stave => { 
      this.staveOrder.add(stave);
    });
    this.staveAdded();
  }

  staveCreated = () => {
    // const stave = event.target.stave;
    this.staveMap.set(event.target, event.target.voices);
    // this.staveMap.set(event.target, [stave, event.target.voices]);
    this.numStaves--;
    this.staveAdded();
  }

  staveAdded() {
    if (this.numStaves === 0) {
      // Order staves according to their slot order
      this.staveOrder.forEach( element => {
        const voices = this.staveMap.get(element);

        const stave = this.vf.Stave({ 
          x: this.x, y: 40, width: 400,
          options: { 
            left_bar: false 
          },
        }); // also sets this.vf.stave = this.stave and this.staves.push(stave);

        // if (element.clef) {
        //   stave.addClef(element.clef);
        // }

        if (element.timeSig) {
          stave.addTimeSignature(element.timeSig);
        }
        
        // if (element.keySig) {
        //   stave.addKeySignature(element.keySig);
        // }

        stave.clef = element.clef;

        this.system.addStave({ stave: stave, voices: voices });
        // const stave = this.staveMap.get(element)[0];
        // const voices = this.staveMap.get(element)[1];
        // this.system.addStave({ stave: stave, voices: voices });
      })

      // Can't add connectors until the staves are added
      if(this.hasAttribute('connected')) {
        this.system.addConnector();
      }

      const systemCreatedEvent = new CustomEvent('systemCreated', { bubbles: true });
      this.dispatchEvent(systemCreatedEvent);
    }
  }
}

window.customElements.define('vf-system', VFSystem);