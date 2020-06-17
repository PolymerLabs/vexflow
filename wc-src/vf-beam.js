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

    this.createNotesAndBeam();
    console.log('vf-beam connectedCallback');
  }

  createNotesAndBeam() {
    this.createNotes(this.notesText, this.stemDirection);
    this.createBeam();
  }

  createNotes(line, stemDirection) { // MOVE TO A SHARED FILE
    this.score.set({ stem: stemDirection });
    const staveNotes = this.score.notes(line);
    this.notes = staveNotes;
    console.log('created notes');
  }

  createBeam() {
    const beam = this.score.beam(this.notes);
    this.beam = beam;

    console.log('created beam');
  }
}

window.customElements.define('vf-beam', VFBeam);
