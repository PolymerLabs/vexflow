import Vex from '../index';

import './vf-voice';
import ElementAddedEvent from './events/elementAddedEvent';

export class VFTuplet extends HTMLElement {

  beamed = false;
  _score;
  stemDirection = 'up';
  location = 'above';

  constructor() {
    super();
  }

  connectedCallback() {
    this.beamed = this.hasAttribute('beamed');
    this.location = this.getAttribute('location') || this.location;

    if (this.getAttribute('stem')) {
      this.stemDirection = this.getAttribute('stem');
    } else {
      const getParentStem = new Event('getStemDirection', { bubbles: true });
      this.dispatchEvent(getParentStem);
    }

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
    this.createNotes(this.textContent, this.stemDirection);

    const numNotes = (this.hasAttribute('numNotes')) ? this.getAttribute('numNotes') : this.notes.length;
    const notesOccupied = this.getAttribute('notesOccupied') || 2;
    const location = this.location === 'below' ? -1 : 1;
    const bracketed = !this.beamed;

    // Following the original VexFlow library:
    // If the user specifies whether or not to draw the ratio, respect that.
    // If not specified, default to drawing the ratio if the difference between 
    // num_notes and notes_occupied is greater than 1.
    var ratioed;
    if (this.hasAttribute('ratioed')) {
      ratioed = (this.getAttribute('ratioed') === 'true')
    } else {
      ratioed = numNotes - notesOccupied > 1;
    }

    this.tuplet = this._score.tuplet(this.notes,
      { 
        num_notes: numNotes,
        notes_occupied: notesOccupied,
        location: location,
        bracketed: bracketed,
        ratioed: ratioed,
      }
    );

    if (this.beamed) {
      this.createBeam();
    }

    const tupletCreatedEvent = new CustomEvent('tupletCreated', { bubbles: true });
    this.dispatchEvent(tupletCreatedEvent);
  }

  createNotes(line, stemDirection) {
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
