 
// ## Description
// 
// This file implements `vf-voice`, the web component that resembles 
// the `Voice` element. 

import Vex from '../index';
import './vf-stave';
import ElementAddedEvent from './events/elementAddedEvent';
import VoiceReadyEvent from './events/voiceReadyEvent';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    slot {
      display: none;
    }
  </style>
  <slot></slot>
`;

export class VFVoice extends HTMLElement {

  /**
   * The Vex.Flow.Factory instance to use.
   * @type {Vex.Flow.Factory}
   * @private
   */
  _vf;

  /**
   * The Vex.Flow.EasyScore instance to use.
   * @type {Vex.Flow.Registry}
   * @private
   */
  _score;

  /**
   * The stem direction for this voice. Can be 'up' or 'down'. 
   * @type {string}
   */
  stem = 'up';

  /**
   * Boolean indicating whether to autogenerate beams for this voice.
   * @type {boolean}
   */
  autoBeam = false;

  /**
   * The notes that make up this voice.
   * @type {[Vex.Flow.StaveNote]}
   */
  notes = [];

  /**
   * The beams that make up this voice.
   * @type {[Vex.Flow.Beam]}
   */
  beams = [];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    // Defaults
    this.numBeams = 0;
    this.numTuplets = 0;
    this.elementToNotesMap = new Map(); // map of textContent nodes/vf-tuplets/vf-beams to their notes
    this.elementOrder = new Set();
  }

  connectedCallback() {
    this.stem = this.getAttribute('stem') || this.stem;
    this.autoBeam = this.hasAttribute('autoBeam');

    this.dispatchEvent(new ElementAddedEvent());

    this.addEventListener('tupletCreated', this.tupletCreated);
    this.addEventListener('beamCreated', this.beamCreated);
  }

  static get observedAttributes() { return ['stem', 'autoBeam'] }

  attributeChangedCallback(name, oldValue, newValue) {
    // TODO (ywsang): Implement code to update based on changes to attributes
  }

  /**
   * Setter to detect when the Factory instance is set. Once the Factory and
   * EasyScore instances are set, vf-voice can start creating components. 
   * 
   * @param {Vex.Flow.Factory} value - The Factory instance that the overall 
   *                                   component is using, set by the parent 
   *                                   vf-score.
   */
  set vf(value) {
    this._vf = value;
    this.registerNodes();
  }

  /**
   * Setter to detect when the EasyScore instance is set. Once the Factory and
   * EasyScore instances are set, vf-voice can start creating components. 
   * 
   * @param {Vex.Flow.EasyScore} value - The EasyScore instance that the parent 
   *                                     stave and its children are using, set 
   *                                     by the parent vf-stave.
   */
  set score(value) {
    this._score = value;
    this.registerNodes();
  }

  registerNodes = () => {
    if (this._vf && this._score) {
      const assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes();
      assignedNodes.forEach(node => { 
        switch (node.nodeName) {
          case '#text':
            const notesText = node.textContent.trim();
            if (notesText) {
              const notes = this._createNotesFromText(notesText);
              this.elementOrder.add(node);
              this.elementToNotesMap.set(node, notes);
              if (this.autoBeam) {
                this.beams.push(...this._autoGenerateBeams(notes));
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
  }

  tupletCreated = (event) => {
    const tuplet = event.target;
    this.elementToNotesMap.set(tuplet, tuplet.tuplet);
    if (tuplet.beam) {
      this.beams.push(...tuplet.beam);
    }
    this.numTuplets--;
    this.elementAdded(tuplet);
  }

  beamCreated = (event) => {
    const beam = event.target;
    this.elementToNotesMap.set(beam, beam.notes);
    this.beams.push(...beam.beam);
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
    if (this.numTuplets === 0 && this.numBeams === 0) {
      // Order notes according to their slot order
      this.elementOrder.forEach(element => {
        this.notes.push(...this.elementToNotesMap.get(element));
      })
      
      // Dispatches event to vf-stave to create and add the voice to the stave
      this.dispatchEvent(new VoiceReadyEvent());
    }
  }

  /**
   * Generates notes based on the text content of this vf-voice element. 
   * Utlizes the EasyScore API Grammar & Parser. 
   * 
   * @param {String} text - The string to parse and create notes from. 
   * @return {[Vex.Flow.StaveNote]} - The notes that were generated from the text. 
   * @private
   */
  _createNotesFromText(text) {
    this._score.set({ stem: this.stem });
    const staveNotes = this._score.notes(text);
    return staveNotes;
  }

  /**
   * Automatically generates beams for the provided notes. 
   * 
   * @param {[Vex.Flow.StaveNote]} notes - The notes to autogenerate beams for.
   * @return {[Vex.Flow.Beam]} - The autogenerated beams. 
   * @private
   */
  _autoGenerateBeams(notes) {
    // TODO (ywsang): Use default beam groups?
    // const groups = Vex.Flow.Beam.getDefaultBeamGroups(this._score.defaults.time);
    // const beams = Vex.Flow.Beam.generateBeams(notes, {
    //   groups: groups
    // });
    const beams = Vex.Flow.Beam.generateBeams(notes);
    beams.forEach( beam => {
      this._vf.renderQ.push(beam);
    })
    return beams;
  }
}

window.customElements.define('vf-voice', VFVoice);
