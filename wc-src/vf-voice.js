import Vex from '../src/index';
import './vf-stave';
import './vf-tuplet';

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
    this.generateBeams = false;

    this.notes = []; // [StaveNote]
    this.beams = []; // [Beam]

    console.log('vf-voice constructor');
  }

  connectedCallback() {
    this.stem = this.getAttribute('stem') || this.stem;
    console.log(this.stem);
    this.generateBeams = this.hasAttribute('generateBeams');
    this.notesText = this.textContent.trim();

    const getScoreEvent = new CustomEvent('getScore', { bubbles: true, detail: { score: null } });
    this.dispatchEvent(getScoreEvent);
    this.score = getScoreEvent.detail.score;

    const getFactoryEvent = new CustomEvent('getFactory', { bubbles: true, detail: { factory: null } });
    this.dispatchEvent(getFactoryEvent);
    this.vf = getFactoryEvent.detail.factory;

    const assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes();
    assignedNodes.forEach(node => {
      switch(node.nodeName) {
        case '#text':
          const notesText = node.textContent.trim();
          if (notesText) {
            console.log('found plain notes');
            const notes = this.createNotes(notesText, this.stem);
            this.notes.push(notes);
            if (this.generateBeams) {
              this.beams.push(this.createBeams(notes));
            }
          }
          break;
        case 'VF-TUPLET':
          console.log('found tuplet');
          console.log(node.tuplet);
          this.notes.push(node.tuplet);
          if (node.beam) {
            this.beams.push([node.beam]);
          }
          break;
      }
    });

    this.notes = this.notes.reduce(concat);
    if (this.beams.length > 0) {
      this.beams = this.beams.reduce(concat);
    }

    const notesAndBeamsCreatedEvent = new CustomEvent('notesCreated', { bubbles: true, detail: { notes: this.notes, beams: this.beams } });
    this.dispatchEvent(notesAndBeamsCreatedEvent);
    console.log('vf-voice connectedCallback');
  }

  createNotes(line, stemDirection) {
    console.log(stemDirection);
    this.score.set({ stem: stemDirection });
    const staveNotes = this.score.notes(line);
    console.log(staveNotes);
    return staveNotes;
  }

  createBeams(notes) {
    const beams = Vex.Flow.Beam.generateBeams(notes);
    beams.forEach(beam => {
      this.vf.renderQ.push(beam);
    });
    return beams;
  }
}

window.customElements.define('vf-voice', VFVoice);