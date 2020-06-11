import Vex from '../src/index';

import './vf-stave';

export class VFTuplet extends HTMLElement {
  constructor() {
    super();

    this.beamed = false;
  }

  connectedCallback() {
    this.notesOccupied = this.getAttribute('notesOccupied');
    this.beamed = this.hasAttribute('beamed');
    this.stemDirection = this.getAttribute('stem') || this.stemDirection; 
    this.notesText = this.textContent;

    const getScoreEvent = new CustomEvent('getScore', { bubbles: true, detail: { score: null } });
    this.dispatchEvent(getScoreEvent);
    this.score = getScoreEvent.detail.score;

    this.createTuplet();
  }
  
  createTuplet() {
    this.createNotes(this.notesText, this.stemDirection);

    this.tuplet = this.score.tuplet(this.notes, 
      { notes_occupied: this.notesOccupied, 
        bracketed: !this.beamed,
        location: this.stemDirection === 'down' ? -1 : 1
      });
    
    if (this.beamed) {
      this.createBeam();
    }
  }

  createNotes(line, stemDirection) { // MOVE TO A SHARED FILE 
    this.score.set({ stem: stemDirection });

    const staveNotes = this.score.notes(line);
    this.notes = staveNotes;
  }

  createBeam() {
    const beam = this.score.beam(this.notes);
    this.beam = beam;
  }
}

window.customElements.define('vf-tuplet', VFTuplet);