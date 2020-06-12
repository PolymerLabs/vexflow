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

    this.setupStave();

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.voicesRegistered);
    console.log('vf-stave connectedCallback')
  }

  setupStave() { // add attributes for stave size?  
    this.score = this.vf.EasyScore();
    this.score.set({
      clef: this.clef,
      time: this.timeSig
    });

    this.stave = this.vf.Stave( { x: 10, y: 40, width: 400 }); // also sets this.vf.stave = this.stave
    this.stave.setContext(this.vf.context);

    // change so attributes always need to be provided but not necessarily rendered? 
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
    
    this.stave.draw();
  }

  voicesRegistered = () => {
    const voiceSlots = this.shadowRoot.querySelector('slot').assignedElements().filter( e => e.nodeName === 'VF-VOICE');
    this.numVoices = voiceSlots.length;
  }

  addVoice = (e) => {
    const notes = e.detail.notes;
    const beams = e.detail.beams; 
    const voice = this.createVoiceFromNotes(notes);

    this.voices.push(voice);
    this.beams = this.beams.concat(beams);

    // Make sure all voices are created first, then format & draw to make sure alignment is correct
    if (this.voices.length === this.numVoices) {
      this.formatAndDrawVoices();
    }
  }

  createVoiceFromNotes(staveNotes) {
    return this.score.voice(staveNotes);
  }

  formatAndDrawVoices() {
    var formatter = new Vex.Flow.Formatter()
    formatter.joinVoices(this.voices);
    formatter.formatToStave(this.voices, this.stave);

    // this.voices.forEach(voice => voice.draw(this.context, this.stave));
    // this.beams.forEach(beam => beam.setContext(this.context).draw());
    this.vf.draw();
  }

  getScore = (e) => {
    e.detail.score = this.score;
  }

}

window.customElements.define('vf-stave', VFStave);