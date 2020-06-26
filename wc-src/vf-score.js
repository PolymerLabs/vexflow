import Vex from '../src/index.js';

const template = document.createElement('template');
template.innerHTML = `
  <div id='vf-score'>
    <slot></slot>
  </div>
`

export class VFScore extends HTMLElement {
  constructor() {
    super();

    this.x = 10;
    this.width = 400;

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.addEventListener('notesRegistered', this.notesRegistered);
    this.addEventListener('systemCreated', this.systemAdded);
    this.addEventListener('draw', this.draw);

    this.addEventListener('vfVoiceReady', this.setFactory);
    this.addEventListener('vfStaveReady', this.setFactory);
    this.addEventListener('vfStaveReady', this.setRegistry);
    this.addEventListener('vfSystemReady', this.setFactory);
  }

  connectedCallback() {
    this.setupVexflow(this.getAttribute('width') || 1600, this.getAttribute('height') || 500);
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.registerSystems);
    this.setupFactory();
  }

  setupVexflow(width, height) {
    const div = this.shadowRoot.getElementById('vf-score');
    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(width, height);
    this.context = renderer.getContext();

    this.registry = new Vex.Flow.Registry();
  }

  setupFactory() {
    this.vf = new Vex.Flow.Factory({renderer: {elementId: null}});
    this.vf.setContext(this.context);
  }

  notesRegistered = () => {
    console.log('learned that notes are registered');
    const curves = this.shadowRoot.querySelector('slot').assignedElements().filter( e => e.nodeName === 'VF-CURVE');
    curves.forEach(this.addCurve);
    // this.draw();
  }

  addCurve = (curve) => {
    this.vf.Curve({
      from: this.getNoteFromId(curve.getAttribute('from')),
      to: this.getNoteFromId(curve.getAttribute('to')),
    });
  }

  getNoteFromId(id) {
    return this.registry.getElementById(id);
  }

  draw = () => {
    this.vf.draw();
  }

  registerSystems = () => {
    console.log('registering systems')
    const systems = this.shadowRoot.querySelector('slot').assignedElements();
    this.numSystems = systems.length;

    systems.forEach(system => {
      system.setupSystem(this.x);
      this.x += this.width;
    });

    this.checkSystems();
  }

  systemAdded = () => {
    this.numSystems--;
    console.log('adding a system, waiting for ' + this.numSystems + ' systems');
    this.checkSystems();
  }

  checkSystems() {
    if (this.numSystems === 0) {
      const system0 = this.vf.systems[0];
      system0.parts.forEach(part => {
        part.stave.addClef(part.stave.clef);
        // part.stave.addTimeSignature(part.stave.timeSig);
      })
      this.vf.draw();
    }
  }

  /** Sets the factory instance of the component that dispatched the event */
  setFactory = () => {
    event.target.vf = this.vf;
  }

  /** Sets the registry instance of the component that dispatched the event */
  setRegistry = () => {
    event.target.registry = this.registry;
  }
}

window.customElements.define('vf-score', VFScore);
