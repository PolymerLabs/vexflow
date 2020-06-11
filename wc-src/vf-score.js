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
  }

  connectedCallback() {
    this.setupVexflow(this.getAttribute('width') || 500, this.getAttribute('height') || 200);
  }

  setupVexflow(width, height) {
    const div = this.shadowRoot.getElementById('vf-score');
    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(width, height);
    this.context = renderer.getContext();

    this.registry = new Vex.Flow.Registry();
    Vex.Flow.Registry.enableDefaultRegistry(this.registry);
  }

  /** Returns the renderer context for this vf-score component */
  getContext = (e) => {
    e.detail.context = this.context;
  }

  /** Returns the registry for this vf-score component */
  getRegistry = (e) => {
    e.detail.registry = this.registry;
  }
}

window.customElements.define('vf-score', VFScore);