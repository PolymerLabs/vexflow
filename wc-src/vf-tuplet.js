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

    const getFactoryScoreEvent = new CustomEvent('getFactoryScore', { bubbles: true, detail: { factoryScore: null, factory: null } });
    this.dispatchEvent(getFactoryScoreEvent);
    this.score = getFactoryScoreEvent.detail.factoryScore;

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
    const getFactoryScoreEvent = new CustomEvent('getFactoryScore', { bubbles: true, detail: { factoryScore: null } });
    this.dispatchEvent(getFactoryScoreEvent);
    const score = getFactoryScoreEvent.detail.factoryScore;

    score.set({ stem: stemDirection });

    const staveNotes = score.notes(line);
    this.notes = staveNotes;
  }

  createBeam() { // MOVE TO A SHARED FILE
    const beam = this.score.beam(this.notes);
    this.beam = beam;
  }
}

window.customElements.define('vf-tuplet', VFTuplet);