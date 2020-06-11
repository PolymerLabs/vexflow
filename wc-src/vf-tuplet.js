import Vex from '../src/index';

import '../src/web-components/vf-stave';
import ElementAddedEvent from '../src/web-components/events/elementAddedEvent';

export class VFTuplet extends HTMLElement {
  constructor() {
    super();

    this.beamed = false;
  }

  connectedCallback() {
    this.notesOccupied = this.getAttribute('notesOccupied');
    this.beamed = this.hasAttribute('beamed');
    this.stemDirection = this.getAttribute('stem');
    this.notesText = this.textContent;

    // const getFactoryScoreEvent = new CustomEvent('getFactoryScore', { bubbles: true, detail: { factoryScore: null, factory: null } });
    // this.dispatchEvent(getFactoryScoreEvent);
    // this.score = getFactoryScoreEvent.detail.factoryScore;
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
    this.createTuplet();
  }

  createTuplet() {
    this.createNotes(this.notesText, this.stemDirection);

    this.tuplet = this._score.tuplet(this.notes, { notes_occupied: this.notesOccupied, bracketed: !this.beamed});

    if (this.beamed) {
      this.createBeam();
    }

    const tupletCreatedEvent = new CustomEvent('tupletCreated', { bubbles: true });
    this.dispatchEvent(tupletCreatedEvent);
  }

  createNotes(line, stemDirection) { // MOVE TO A SHARED FILE
    // const getFactoryScoreEvent = new CustomEvent('getFactoryScore', { bubbles: true, detail: { factoryScore: null } });
    // this.dispatchEvent(getFactoryScoreEvent);
    // const score = getFactoryScoreEvent.detail.factoryScore;

    this._score.set({ stem: stemDirection });

    const staveNotes = this._score.notes(line);
    this.notes = staveNotes;
  }

  createBeam() { // MOVE TO A SHARED FILE
    const beam = this._score.beam(this.notes);
    this.beam = beam;
  }
}

window.customElements.define('vf-tuplet', VFTuplet);
