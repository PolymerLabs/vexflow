import './vf-score';
import StaveAddedEvent from './events/staveAddedEvent';
import ElementAddedEvent from './events/elementAddedEvent';

export class VFCurve extends HTMLElement {
  constructor() {
    super();

    this._vf = undefined;
    this._registry = undefined;
    console.log('vf-curve constructor');
  }

  connectedCallback() {
    this.startId = this.getAttribute('from');
    this.endId = this.getAttribute('to');

    this.dispatchEvent(new StaveAddedEvent()); // TODO: Make more generic, used by stave + curve to get the registry
    this.dispatchEvent(new ElementAddedEvent());
    // console.log('vf-curve connectedCallback');
  }

  set vf(value) {
    this._vf = value;
  }

  set registry(value) {
    this._registry = value;
  }

  addCurve() {
    console.log('from, id = ' + this.startId);
    console.log(this.getNoteFromId(this.startId));
    console.log('to, id = ' + this.endId);
    console.log(this.getNoteFromId(this.endId));

    this._vf.Curve({
      from: this.getNoteFromId(this.startId),
      to: this.getNoteFromId(this.endId),
    });
  }

  getNoteFromId(id) {
    return this._registry.getElementById(id);
  }
}

window.customElements.define('vf-curve', VFCurve);
