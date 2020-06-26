import './vf-stave';

export class VFBeam extends HTMLElement {
  constructor() {
    super();

    this.stemDirection = 'up';

    this._vf = undefined;
    this._score = undefined;
  }

  connectedCallback() {
    this.stemDirection = this.getAttribute('stem') || this.stemDirection;
    this.notesText = this.textContent;

    const vfBeamReadyEvent = new CustomEvent('vfBeamReady', { bubbles: true } );
    this.dispatchEvent(vfBeamReadyEvent);
  }

  set score(value) {
    this._score = value;
    this.createNotesAndBeam();
  }

  createNotesAndBeam() {
    this.createNotes(this.notesText, this.stemDirection);
    this.createBeam();
    
    const beamCreatedEvent = new CustomEvent('beamCreated', { bubbles: true, detail: { beam: this } });
    this.dispatchEvent(beamCreatedEvent);
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

window.customElements.define('vf-beam', VFBeam);
