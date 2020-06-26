import Vex from '../src/index.js';
import './vf-score';

const template = document.createElement('template');
template.innerHTML = `
  <slot></slot>
`;

export class VFStave extends HTMLElement {
  constructor() {
    super();
    
    // Defaults
    this.voices = [];
    this.beams = [];
    this._vf = undefined;
    this._registry = undefined;

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.addEventListener('vfVoiceReady', this.setScore);
    this.addEventListener('vfTupletReady', this.setScore);
    this.addEventListener('vfBeamReady', this.setScore);

    this.addEventListener('notesCreated', this.addVoice);
  }

  connectedCallback() {
    this.clef = this.getAttribute('clef');
    this.timeSig = this.getAttribute('timeSig');
    this.keySig = this.getAttribute('keySig');

    const vfStaveReadyEvent = new CustomEvent('vfStaveReady', { bubbles: true });
    this.dispatchEvent(vfStaveReadyEvent);

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.registerVoices);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.registerVoices);
  }

  set vf(value) {
    this._vf = value;
    this.setupStave();
  }

  set registry(value) {
    this._registry = value;
  }

  setupStave() {
    this.score = this._vf.EasyScore();
    this.score.set({
      clef: this.clef || 'treble',
      time: this.timeSig || '4/4'
    });

    this.stave = this._vf.Stave({ 
      x: parseInt(this.getAttribute('x')) || 10, 
      y: 40, 
      width: parseInt(this.getAttribute('width')) || 400,
    });

    if (this.clef) {
      this.stave.addClef(this.clef);
    }

    if (this.timeSig) {
      this.stave.addTimeSignature(this.timeSig);
    }
    
    if (this.keySig) {
      this.stave.addKeySignature(this.keySig);
    }
    
    this.stave.draw();
  }
  
  /** slotchange event listener */
  registerVoices = () => {
    const voiceSlots = this.shadowRoot.querySelector('slot').assignedElements().filter( e => e.nodeName === 'VF-VOICE');
    this.numVoices = voiceSlots.length;

    if (this._vf && this._registry && this.voices.length === this.numVoices) {
      this.formatAndDrawVoices();
    }
  }

  addVoice = (e) => {
    const notes = e.detail.notes;
    this.registerNotes(notes);
    const beams = e.detail.beams; 
    const voice = this.createVoiceFromNotes(notes);

    this.voices.push(voice);
    this.beams = this.beams.concat(beams);

    // Make sure all voices are created first, then format & draw to make sure alignment is correct
    if (this._vf && this._registry && this.voices.length === this.numVoices) {
      this.formatAndDrawVoices();
    }
  }

  // Register notes that have non-auto-generated IDs to the score's registry
  registerNotes(staveNotes) {
    staveNotes.forEach( note => {
      const id = note.attrs.id;
      if (!id.includes('auto')) { 
        this._registry.register(note, id); 
      }
    })
  }

  createVoiceFromNotes(staveNotes) {
    return this.score.voice(staveNotes);
  }

  formatAndDrawVoices() {
    var formatter = new Vex.Flow.Formatter()
    formatter.joinVoices(this.voices);
    formatter.formatToStave(this.voices, this.stave);
    this._vf.draw();

    // Tell vf-score that notes from all voices are registered and formatted
    const notesRegisteredEvent = new CustomEvent('notesRegistered', { bubbles: true });
    this.dispatchEvent(notesRegisteredEvent);
  }

  /** Sets the score instance of the component that dispatched the event */
  setScore = () => {
    event.target.score = this.score;
  }

}

window.customElements.define('vf-stave', VFStave);
