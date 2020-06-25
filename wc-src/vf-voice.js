import Vex from '../src/index';
import './vf-stave';

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
    this.elementOrder = new Set();

    this.notes = [];
    this.beams = [];

    console.log('vf-voice constructor');
  }

  connectedCallback() {
    this.stem = this.getAttribute('stem') || this.stem;
    this.autoBeam = this.hasAttribute('autoBeam');
    this.notesText = this.textContent.trim();

    const getScoreEvent = new CustomEvent('getScore', { bubbles: true, detail: { score: null } });
    this.dispatchEvent(getScoreEvent);
    this.score = getScoreEvent.detail.score;

    // const getStaveEvent = new CustomEvent('getStave', { bubbles: true, detail: { score: null} });
    // this.dispatchEvent(getStaveEvent);
    // this.stave = getStaveEvent.detail.stave;

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
            this.elementOrder.add(node);
            this.elementToNotesMap.set(node, notes);
            if (this.autoBeam) {
              this.beams.push(this.autoGenerateBeams(notes));
            }
          }
          break;
        case 'VF-TUPLET':
          this.numTuplets++;
          this.elementOrder.add(node);
          break;
        case 'VF-BEAM':
          this.numBeams++;
          this.elementOrder.add(node);
          break;
        default:
          break;
      }
    });
    this.elementAdded();
  }

  tupletCreated = () => {
    const tuplet = event.target;
    this.elementToNotesMap.set(tuplet, tuplet.tuplet);
    if (tuplet.beam) {
      this.beams.push([tuplet.beam]);
    }
    this.numTuplets--;
    this.elementAdded(tuplet);
  }

  beamCreated = () => {
    const beam = event.target;
    this.elementToNotesMap.set(beam, beam.notes);
    this.beams.push([beam.beam]);
    this.numBeams--;
    this.elementAdded(beam);
  }

  /** For debugging what's in the map */
  iterateOverMap() {
    const it = this.elementToNotesMap.values();
    const keysIt = this.elementToNotesMap.keys();
    let notes = it.next();
    let key = keysIt.next();
    while (!notes.done) {
      console.log(key);
      console.log('value: ' + notes);
      console.log(notes);
      notes = it.next();
      key = keysIt.next();
    }
  }

  elementAdded() {
    // Don't fire notesAndBeamsCreatedEvent until all the tuplets & beams come back
    console.log('checking if all elements are back');
    if (this.numTuplets === 0 && this.numBeams === 0) {
      console.log('all elements received');
      // Order notes according to their slot order
      this.elementOrder.forEach(element => {
        this.notes.push(this.elementToNotesMap.get(element));
      })

      this.notes = this.notes.reduce(concat);
      if (this.beams.length > 0) {
        this.beams = this.beams.reduce(concat);
      }
      
      // Dispatches event to vf-stave to create and add the voice to the stave
      const notesAndBeamsCreatedEvent = new CustomEvent('notesCreated', { bubbles: true, detail: { notes: this.notes, beams: this.beams } });
      this.dispatchEvent(notesAndBeamsCreatedEvent);
    }
  }

  createNotes(line, stemDirection) {
    this.score.set({ stem: stemDirection });
    console.log('createNotes in vf-voice');
    // this.vf.stave = this.stave;
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