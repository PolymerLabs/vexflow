 
// ## Description
// 
// This file implements `vf-voice`, the web component that resembles 
// the `Voice` element. 
// `vf-voice` is responsible for generating and/or gathering
// all of the notes and beams that make up the voice, including those from its
// child components, which may be `vf-tuplet`s and `vf-beam`s. 
// Once all the notes and beams are created, `vf-voice` dispatches an event to
// its parent `vf-stave` to signal that it's ready for the voice to be created
// the voice.

import Vex from '../index';
import './vf-stave';
import { createNotesFromText } from './utils';
import BeamReadyEvent from './events/beamReadyEvent';
import ElementAddedEvent from './events/elementAddedEvent';
import TupletReadyEvent from './events/tupletReadyEvent';
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

  /**
   * The number of vf-beam children that this voice has.
   * @type {number}
   * @private
   */
  _numBeams = 0;

  /**
   * The number of vf-tuplet children that this voice has.
   * @type {number}
   * @private
   */
  _numTuplets = 0;

  /**
   * A mapping of this voice's child nodes to their notes.
   * Keys may be text content nodes, vf-tuplet nodes, or vf-beam nodes.
   * @type {Map<Node, [Vex.Flow.StaveNote]>}
   * @private
   */
  _elementToNotesMap = new Map();

  /**
   * A set representing the order of this voice's child nodes. 
   * @type {Set<Node>}
   * @private
   */
  _elementOrder = new Set();

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
  }

  connectedCallback() {
    this.stem = this.getAttribute('stem') || this.stem;
    this.autoBeam = this.hasAttribute('autoBeam');

    this.dispatchEvent(new ElementAddedEvent());

    this.addEventListener('getStemDirection', this.setChildStem);

    // vf-voice listens to the TupletReadyEvent and BeamReadyEvent events so 
    // it can detect when its child tuplets and beams have created their notes 
    // and establish how many tuplets and beams it expects to receive events from. 
    this.addEventListener(TupletReadyEvent.eventName, this.tupletCreated);
    this.addEventListener(BeamReadyEvent.eventName, this.beamCreated);
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
              const notes = createNotesFromText(this._score, notesText, this.stem);
              this._elementOrder.add(node);
              this._elementToNotesMap.set(node, notes);
              if (this.autoBeam) {
                this.beams.push(...this._autoGenerateBeams(notes));
              }
            }
            break;
          case 'VF-TUPLET':
            this._numTuplets++;
            this._elementOrder.add(node);
            break;
          case 'VF-BEAM':
            this._numBeams++;
            this._elementOrder.add(node);
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
    this._elementToNotesMap.set(tuplet, tuplet.tuplet);
    if (tuplet.beam) {
      this.beams.push(...tuplet.beam);
    }
    this._numTuplets--;
    this.elementAdded(tuplet);
  }

  beamCreated = (event) => {
    const beam = event.target;
    this._elementToNotesMap.set(beam, beam.notes);
    this.beams.push(...beam.beam);
    this._numBeams--;
    this.elementAdded(beam);
  }

  elementAdded() {
    // Don't fire notesAndBeamsCreatedEvent until all the tuplets & beams come back
    if (this._numTuplets === 0 && this._numBeams === 0) {
      // Order notes according to their slot order
      this._elementOrder.forEach(element => {
        this.notes.push(...this._elementToNotesMap.get(element));
      })
      
      // Dispatches event to vf-stave to create and add the voice to the stave
      this.dispatchEvent(new VoiceReadyEvent());
    }
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

  setChildStem = (event) => {
    event.target.stemDirection = this.stem;
  }
}

window.customElements.define('vf-voice', VFVoice);
