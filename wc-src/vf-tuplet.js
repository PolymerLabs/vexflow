import Vex from '../src/index';

import './vf-stave';

export class VFTuplet extends HTMLElement {
  constructor() {
    super();

    // Defaults
    this.beamed = false;
    this.stemDirection = 'up';

    this._score = undefined;
  }

  connectedCallback() {
    this.notesOccupied = this.getAttribute('notesOccupied');
    this.beamed = this.hasAttribute('beamed');
    this.stemDirection = this.getAttribute('stem') || this.stemDirection;
    this.notesText = this.textContent;

    const vfTupletReadyEvent = new CustomEvent('vfTupletReady', { bubbles: true } );
    this.dispatchEvent(vfTupletReadyEvent);
  }

  set score(value) {
    this._score = value;
    this.createTuplet();
  }

  createTuplet() {
    this.createNotes(this.notesText, this.stemDirection);

    this.tuplet = this._score.tuplet(this.notes,
      { notes_occupied: this.notesOccupied,
        bracketed: !this.beamed,
        location: this.stemDirection === 'down' ? -1 : 1
      });

    if (this.beamed) {
      this.createBeam();
    }

    const tupletCreatedEvent = new CustomEvent('tupletCreated', { bubbles: true, detail: { tuplet: this }});
    this.dispatchEvent(tupletCreatedEvent);
  }

  createNotes(line, stemDirection) {
    this._score.set({ stem: stemDirection });
    const staveNotes = this._score.notes(line);
    this.notes = staveNotes;
  }

  createBeam() {
    const beam = this._score.beam(this.notes);
    this.beam = beam;
  }
}

window.customElements.define('vf-tuplet', VFTuplet);
