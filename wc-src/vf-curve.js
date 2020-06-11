import './vf-stave';

export class VFCurve extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const getRegistryEvent = new CustomEvent('getRegistry', { bubbles: true, detail: { registry: null } });
    this.dispatchEvent(getRegistryEvent);
    this.registry = getRegistryEvent.detail.registry;

    const getFactoryScoreEvent = new CustomEvent('getFactoryScoreFromCurve', { bubbles: true, detail: { factoryScore: null, factory: null } });
    this.dispatchEvent(getFactoryScoreEvent);
    this.vf = getFactoryScoreEvent.detail.factory;

    this.addCurve();
    
  }

  addCurve() {
    const curve = this.vf.Curve({
      from: this.getNoteFromId(this.getAttribute('from')),
      to: this.getNoteFromId(this.getAttribute('to')),
    })

    const curvedCreatedEvent = new CustomEvent('curveCreated', { bubbles: true, detail: { notes: this.notes, beams: this.beams } });
    this.dispatchEvent(curvedCreatedEvent);
  }

  getNoteFromId(id) {
    console.log('getNoteFromId, id=' + id);
    console.log(this.registry.getElementById(id));
    return this.registry.getElementById(id);
  }
}

window.customElements.define('vf-curve', VFCurve);