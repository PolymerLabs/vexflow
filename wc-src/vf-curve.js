import './vf-stave';

export class VFCurve extends HTMLElement {
  constructor() {
    super();

    console.log('vf-curve constructor');
  }

  connectedCallback() {
    const getRegistryEvent = new CustomEvent('getRegistry', { bubbles: true, detail: { registry: null } });
    this.dispatchEvent(getRegistryEvent);
    this.registry = getRegistryEvent.detail.registry;

    const getFactoryEvent = new CustomEvent('getFactory', { bubbles: true, detail: { factoryScore: null, factory: null } });
    this.dispatchEvent(getFactoryEvent);
    this.vf = getFactoryEvent.detail.factory;

    this.from = this.getAttribute('from');
    this.to = this.getAttribute('to');

    console.log('vf-curve connectedCallback');

    this.addCurve();
  }

  addCurve() {
    this.vf.Curve({
      from: this.getNoteFromId(this.getAttribute('from')),
      to: this.getNoteFromId(this.getAttribute('to')),
    });

    const curvedCreatedEvent = new CustomEvent('curveCreated', { bubbles: true });
    this.dispatchEvent(curvedCreatedEvent);
  }

  getNoteFromId(id) {
    // return Vex.Flow.Registry.getDefaultRegistry().getElementById(id);
    console.log('getNoteFromId, id = ' + id);
    console.log(this.registry.getElementById(id));
    return this.registry.getElementById(id);
  }
}

window.customElements.define('vf-curve', VFCurve);
