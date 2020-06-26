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

    this.addEventListener('vfVoiceReady', this.setFactory);
    this.addEventListener('vfStaveReady', this.setFactory);
    this.addEventListener('vfStaveReady', this.setRegistry);
  }

  connectedCallback() {
    this.setupVexflow(this.getAttribute('width') || 500, this.getAttribute('height') || 200);
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
    const curves = this.shadowRoot.querySelector('slot').assignedElements().filter( e => e.nodeName === 'VF-CURVE');
    curves.forEach(this.addCurve);
    this.draw();
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
