// ## Description
// 
// This file implements `vf-tuplet`, the web component that closely resembles 
// the `Beam` element.
// `vf-beam` is responsible for creating notes from its text content and the beam
// for those notes. One beam goes across all of the notes.
// Once the beam and notes are created, `vf-beam` dispatches an event to its parent
// `vf-voice` to signal that it's ready for its notes and beam to be added to
// the stave.

import './vf-voice';
import { createBeamForNotes, createNotesFromText } from './utils';
import BeamReadyEvent from './events/beamReadyEvent';
import ElementAddedEvent from './events/elementAddedEvent';

export class VFBeam extends HTMLElement {

  /**
   * The Vex.Flow.EasyScore instance to use.
   * @type {Vex.Flow.Registry}
   * @private
   */
  _score;

  /**
   * The direction of the stems in the tuplet. If the notes have their own stem
   * direction in the text (e.g. C4/q[stem='down]), the note's stem direction 
   * takes precendence over this property.
   * @type {String}
   * @private
   */
  _stemDirection = 'up';

  /**
   * The notes that make up this vf-beam.
   * @type {[Vex.Flow.StaveNote]}
   */
  notes;

  /**
   * The beam for this vf-beam.
   * @type {Vex.Flow.Beam}
   */
  beam;

  constructor() {
    super();
  }

  connectedCallback() {
    this._stemDirection = this.getAttribute('stem') || this._stemDirection;

    this.dispatchEvent(new ElementAddedEvent());
  }

  /**
   * Setter to detect when the EasyScore instance is set. Once the EasyScore
   * instances is set, vf-beam can start creating components.
   *
   * @param {Vex.Flow.EasyScore} value - The EasyScore instance that the parent
   *                                     stave and its children are using, set
   *                                     by the parent vf-stave.
   */
  set score(value) {
    this._score = value;
    this.createNotesAndBeam();
  }

  /**
   * Creates the StaveNotes and Beam from the text content of this vf-beam.
   */
  createNotesAndBeam() {
    this.notes = createNotesFromText(this._score, this.textContent, this._stemDirection);
    this.beam = createBeamForNotes(this._score, this.notes);

    /** 
     * Tell the parent vf-voice that this vf-beam has finished creating its 
     * notes and beam and is ready to be added to the voice.
     */
    this.dispatchEvent(new BeamReadyEvent());
  }
}

window.customElements.define('vf-beam', VFBeam);
