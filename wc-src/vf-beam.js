import './vf-stave';

export class VFBeam extends HTMLElement {
  constructor() {
    super();

    this.stemDirection = 'up';
    console.log('vf-beam constructor');
  }

  connectedCallback() {
    this.stemDirection = this.getAttribute('stem') || this.stemDirection;
    this.notesText = this.textContent;

    const getScoreEvent = new CustomEvent('getScore', { bubbles: true, detail: { score: null } });
    this.dispatchEvent(getScoreEvent);
    this.score = getScoreEvent.detail.score;

    const getStaveEvent = new CustomEvent('getStave', { bubbles: true, detail: { score: null} });
    this.dispatchEvent(getStaveEvent);
    this.stave = getStaveEvent.detail.stave;

    const getFactoryEvent = new CustomEvent('getFactory', { bubbles: true, detail: { factory: null } });
    this.dispatchEvent(getFactoryEvent);
    this.vf = getFactoryEvent.detail.factory;

    this.createNotesAndBeam();
  }

  createNotesAndBeam() {
    this.createNotes(this.notesText, this.stemDirection);
    this.createBeam();
    
    console.log('dispatching beamCreated event');

    const beamCreatedEvent = new CustomEvent('beamCreated', { bubbles: true, detail: { beam: this } });
    this.dispatchEvent(beamCreatedEvent);
  }

  createNotes(line, stemDirection) { // MOVE TO A SHARED FILE
    this.score.set({ stem: stemDirection });
    console.log('create notes in vf-beam');
    this.vf.stave = this.stave;
    const staveNotes = this.score.notes(line);
    this.notes = staveNotes;
  }

  createBeam() {
    const beam = this.score.beam(this.notes);
    this.beam = beam;
  }
}

window.customElements.define('vf-beam', VFBeam);
