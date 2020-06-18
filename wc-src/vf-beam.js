import '../src/web-components/vf-stave';
import ElementAddedEvent from '../src/web-components/events/elementAddedEvent';

export class VFBeam extends HTMLElement {
  constructor() {
    super();

    this.stemDirection = 'up';
  }

  connectedCallback() {
    this.stemDirection = this.getAttribute('stem') || this.stemDirection;
    this.notesText = this.textContent;

    this.dispatchEvent(new ElementAddedEvent());
  }

  /**
   * Setter to detect when the EasyScore instance is set. Once the Factory and
   * EasyScore instances are set, vf-tuplet can start creating components.
   *
   * @param {Vex.Flow.EasyScore} value - The EasyScore instance that the parent
   *                                     stave and its children are using, set
   *                                     by the parent vf-stave.
   */
  set score(value) {
    this._score = value;
    this.createNotesAndBeam();
  }

  createNotesAndBeam() {
    this.createNotes(this.notesText, this.stemDirection);
    this.createBeam();
    
    const beamCreatedEvent = new CustomEvent('beamCreated', { bubbles: true });
    this.dispatchEvent(beamCreatedEvent);
  }

  createNotes(line, stemDirection) { // MOVE TO A SHARED FILE
    this._score.set({ stem: stemDirection });
    const staveNotes = this._score.notes(line);
    this.notes = staveNotes;
  }

  createBeam() {
    const beam = this._score.beam(this.notes);
    this.beam = beam;
  }
}

window.customElements.define('vf-beam', VFBeam);
