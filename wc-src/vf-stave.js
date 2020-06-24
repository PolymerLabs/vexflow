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

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.addEventListener('getScore', this.getScore);
    this.addEventListener('getStave', this.getStave);
    this.addEventListener('notesCreated', this.addVoice);

    console.log('vf-stave constructor')
  }

  connectedCallback() {
    this.clef = this.getAttribute('clef');
    this.timeSig = this.getAttribute('timeSig');
    this.keySig = this.getAttribute('keySig');

    const getFactoryEvent = new CustomEvent('getFactory', { bubbles: true, detail: { factory: null } });
    this.dispatchEvent(getFactoryEvent);
    this.vf = getFactoryEvent.detail.factory;

    const getRegistryEvent = new CustomEvent('getRegistry', { bubbles: true, detail: { registry: null } });
    this.dispatchEvent(getRegistryEvent);
    this.registry = getRegistryEvent.detail.registry;

    this.setupStave();

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.voicesRegistered);
    console.log('vf-stave connectedCallback')
  }

  setupStave() { // add attributes for stave size?  
    this.score = this.vf.EasyScore();
    this.score.set({
      clef: this.clef || 'treble',
      time: this.timeSig || '4/4'
    });

    this.stave = this.vf.Stave({ 
      x: parseInt(this.getAttribute('x')) || 10, y: 40, width: parseInt(this.getAttribute('width')) || 400,
      options: { 
        left_bar: false 
      },
    }); // also sets this.vf.stave = this.stave and this.staves.push(stave);

    // TODO: change so attributes always need to be provided but not necessarily rendered? 
    // or add the clef component back, if clef component then render? 
    if (this.clef) {
      this.stave.addClef(this.clef);
    }

    if (this.timeSig) {
      this.stave.addTimeSignature(this.timeSig);
    }
    
    if (this.keySig) {
      this.stave.addKeySignature(this.keySig);
    }
    
    // this.stave.draw();
  }

  voicesRegistered = () => {
    const voiceSlots = this.shadowRoot.querySelector('slot').assignedElements().filter( e => e.nodeName === 'VF-VOICE');
    this.numVoices = voiceSlots.length;

    if (this.voices.length === this.numVoices) {
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
    if (this.voices.length === this.numVoices) {
      this.formatAndDrawVoices();
    }
  }

  // Register notes that have non-auto-generated IDs to the score's registry
  registerNotes(staveNotes) {
    staveNotes.forEach( note => {
      const id = note.attrs.id;
      if (!id.includes('auto')) { 
        this.registry.register(note, id); 
      }
    })
  }

  createVoiceFromNotes(staveNotes) {
    console.log('creating voice from notes');
    return this.score.voice(staveNotes);
  }

  formatAndDrawVoices() {
    // var formatter = new Vex.Flow.Formatter()
    // formatter.joinVoices(this.voices);
    // formatter.formatToStave(this.voices, this.stave);
    // this.vf.draw();

    const staveCreatedEvent = new CustomEvent('staveCreated', { bubbles: true });
    this.dispatchEvent(staveCreatedEvent);
    // Tell vf-score that notes from all voices are registered and formatted
    const notesRegisteredEvent = new CustomEvent('notesRegistered', { bubbles: true });
    this.dispatchEvent(notesRegisteredEvent);
  }

  getScore = (e) => {
    e.detail.score = this.score;
  }

  getStave = (e) => {
    e.detail.stave = this.stave;
  }

}

window.customElements.define('vf-stave', VFStave);