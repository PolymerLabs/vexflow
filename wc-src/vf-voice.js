import Vex from '../src/index';
import './vf-stave';
// import './vf-tuplet';
// import './vf-beam';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    slot {
      display: none;
    }
  </style>
  <slot></slot>
`;

function concat(a, b) {
  return a.concat(b);
}

export class VFVoice extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    // Defaults
    this.stem = 'up';
    this.autoBeam = false;
    this.numBeams = 0;
    this.numTuplets = 0;
    this.elementToNotesMap = new Map();

    this.notes = []; // [StaveNote]
    this.beams = []; // [Beam]

    console.log('vf-voice constructor');
  }

  connectedCallback() {
    this.stem = this.getAttribute('stem') || this.stem;
    this.autoBeam = this.hasAttribute('autoBeam');
    this.notesText = this.textContent.trim();

    const getScoreEvent = new CustomEvent('getScore', { bubbles: true, detail: { score: null } });
    this.dispatchEvent(getScoreEvent);
    this.score = getScoreEvent.detail.score;

    const getFactoryEvent = new CustomEvent('getFactory', { bubbles: true, detail: { factory: null } });
    this.dispatchEvent(getFactoryEvent);
    this.vf = getFactoryEvent.detail.factory;

    this.addEventListener('tupletCreated', this.tupletCreated);
    this.addEventListener('beamCreated', this.beamCreated);
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.registerNodes);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.registerNodes);
  }

  registerNodes = () => {
    const assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes();
    assignedNodes.forEach(node => { 
      switch (node.nodeName) {
        case '#text':
          const notesText = node.textContent.trim();
          if (notesText) {
            const notes = this.createNotes(notesText, this.stem);
            this.elementToNotesMap.set(node, notes);
            this.notes.push(notes);
            if (this.autoBeam) {
              this.beams.push(this.autoGenerateBeams(notes));
            }
          }
          break;
        case 'VF-TUPLET':
          this.numTuplets++;
          this.elementToNotesMap.set(node, []);
          break;
        case 'VF-BEAM':
          this.numBeams++;
          this.elementToNotesMap.set(node, []);
          break;
        default:
          break;
      }
    });
    this.elementAdded();
  }

  tupletCreated = (e) => {
    const element = e.detail.tuplet;
    this.elementToNotesMap.set(element, element.tuplet);
    if (element.beam) {
      this.beams.push([element.beam]);
    }
    this.numTuplets--;
    this.elementAdded();
  }

  beamCreated = (e) => {
    const element = e.detail.beam;
    this.elementToNotesMap.set(element, element.notes);
    this.beams.push([element.beam]);
    this.numBeams--;
    this.elementAdded();
  }

  elementAdded() {
    // Don't fire notesAndBeamsCreatedEvent until all the tuplets & beams come back
    if (this.numTuplets === 0 && this.numBeams === 0) {
      this.notes = Array.from(this.elementToNotesMap.values()).reduce(concat);
      if (this.beams.length > 0) {
        this.beams = this.beams.reduce(concat);
      }
      
      const notesAndBeamsCreatedEvent = new CustomEvent('notesCreated', { bubbles: true, detail: { notes: this.notes, beams: this.beams } });
      this.dispatchEvent(notesAndBeamsCreatedEvent);
    }
  }

  createNotes(line, stemDirection) {
    this.score.set({ stem: stemDirection });
    const staveNotes = this.score.notes(line);
    return staveNotes;
  }

  autoGenerateBeams(notes) {
    const beams = Vex.Flow.Beam.generateBeams(notes);
    beams.forEach(beam => {
      this.vf.renderQ.push(beam);
    });
    return beams;
  }
}

window.customElements.define('vf-voice', VFVoice);