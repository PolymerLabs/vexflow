import '../src/web-components/vf-stave';

export class VFCurve extends HTMLElement {
  constructor() {
    super();

    console.log('vf-curve constructor');
  }
}

window.customElements.define('vf-curve', VFCurve);
