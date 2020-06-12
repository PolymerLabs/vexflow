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

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.addEventListener('getContext', this.getContext);
    this.addEventListener('getRegistry', this.getRegistry);
    this.addEventListener('getFactory', this.getFactory);
    this.addEventListener('curveCreated', this.addCurve);
  }

  connectedCallback() {
    this.setupVexflow(this.getAttribute('width') || 500, this.getAttribute('height') || 200);
    this.setupFactory();
  }

  setupVexflow(width, height) {
    const div = this.shadowRoot.getElementById('vf-score');
    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(width, height);
    this.context = renderer.getContext();

    this.registry = new Vex.Flow.Registry();
    // Vex.Flow.Registry.enableDefaultRegistry(this.registry);
  }

  setupFactory() {
    this.vf = new Vex.Flow.Factory({renderer: {elementId: null}});
    this.vf.setContext(this.context);
  }

  /** Returns the renderer context for this vf-score component */
  getContext = (e) => {
    e.detail.context = this.context;
  }

  /** Returns the VF.Factory for this vf-score component */
  getFactory = (e) => {
    e.detail.factory = this.vf;
  }

  /** Returns the registry for this vf-score component */
  getRegistry = (e) => {
    e.detail.registry = this.registry;
  }

  addCurve = () => { // TODO: make a general 'render' function? 
    console.log('addCurve received');
    this.vf.draw();
  }
}

window.customElements.define('vf-score', VFScore);