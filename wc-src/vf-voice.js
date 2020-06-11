import Vex from '../src/index.js';
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

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    // Defaults
    this.stem = 'up';
    this.generateBeams = false;

    this.notes = [] // [StaveNote]
    this.beams = [] // [Beam]

    console.log('vf-voice constructor')
  }

  connectedCallback() {
    this.stem = this.getAttribute('stem') || this.stem;
    this.generateBeams = this.hasAttribute('generateBeams');
    this.notesText = this.textContent.trim();

    const getFactoryScoreEvent = new CustomEvent('getFactoryScore', { bubbles: true, detail: { factoryScore: null, factory: null } });
    this.dispatchEvent(getFactoryScoreEvent);
    this.score = getFactoryScoreEvent.detail.factoryScore;
    this.vf = getFactoryScoreEvent.detail.factory;

    const assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes();

    assignedNodes.forEach( node => {
      switch(node.nodeName) {
        case '#text':
          const notesText = node.textContent.trim();
          if (notesText) {
            const notes = this.createNotes(notesText, this.stem);
            this.notes.push(notes);
            if (this.generateBeams) {
              this.beams.push(this.createBeams(notes));
            }
          }
          break;
        case 'VF-TUPLET':
          this.notes.push(node.tuplet);
          if (node.beam) {
            this.beams.push([node.beam]);
          }
          break;
      }
    })

    this.notes = this.notes.reduce(concat);
    if (this.beams.length > 0) {
      this.beams = this.beams.reduce(concat);
    }

    const notesAndBeamsCreatedEvent = new CustomEvent('notesCreated', { bubbles: true, detail: { notes: this.notes, beams: this.beams } });
    this.dispatchEvent(notesAndBeamsCreatedEvent);
    console.log('vf-voice connectedCallback')
  }

  createNotes(line, stemDirection) {
    this.score.set({ stem: stemDirection });
    const staveNotes = this.score.notes(line);

    // this.addSlur(staveNotes);
    return staveNotes;
  }

  createBeams(notes) {
    const beams = Vex.Flow.Beam.generateBeams(notes);
    beams.forEach( beam => {
      this.vf.renderQ.push(beam);
    })
    return beams;
  }

  // testing creating a slur
  addSlur(notes) {
    this.vf.Curve({ from: notes[0], to: notes[2] });
  }
}

window.customElements.define('vf-voice', VFVoice);