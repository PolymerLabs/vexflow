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

    this.setupSystem();

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.registerStaves);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.registerStaves);
  }

  setupSystem() {
    this.system = this.vf.System({ 
      x: parseInt(this.getAttribute('x')) || 10, 
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
    const stave = event.target.stave;
    this.staveMap.set(event.target, [stave, event.target.voices]);
    this.numStaves--;
    this.staveAdded();
  }

  staveAdded() {
    if (this.numStaves === 0) {
      // Order staves according to their slot order
      this.staveOrder.forEach(element => {
        const stave = this.staveMap.get(element)[0];
        const voices = this.staveMap.get(element)[1];
        this.system.addStave({ stave: stave, voices: voices });
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