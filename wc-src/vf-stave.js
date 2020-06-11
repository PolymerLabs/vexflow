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
    // this.notes = [];
    // this.timeSig = '4/4';
    // this.clef = 'treble';
    // this.keySig = 'C';

    this.attachShadow({ mode:'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.addEventListener('getFactoryScore', this.getFactoryScore);
    this.addEventListener('notesCreated', this.addVoice);

    console.log('vf-stave constructor')
  }

  connectedCallback() {
    this.clef = this.getAttribute('clef');
    this.timeSig = this.getAttribute('timeSig');
    this.keySig = this.getAttribute('keySig');

    this.setupFactory();
    this.setupStave();

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.voicesRegistered);
    console.log('vf-stave connectedCallback')
  }

  setupFactory() {
    this.vf = new Vex.Flow.Factory({renderer: {elementId: null}});

    const getContextEvent = new CustomEvent('getContext', { bubbles: true, detail: {context: null } });
    this.dispatchEvent(getContextEvent);
    this.context = getContextEvent.detail.context;

    this.vf.setContext(this.context);
    
    this.score = this.vf.EasyScore();
    this.score.set({
      clef: this.clef,
      time: this.timeSig
    });
  }

  setupStave() { // add attributes for stave size?  
    this.stave = this.vf.Stave( { x: 10, y: 40, width: 400 });
    this.stave.setContext(this.context);

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
    // this.addSlur(notes);

    var formatter = new Vex.Flow.Formatter()
    formatter.joinVoices(this.voices);
    formatter.formatToStave(this.voices, this.stave);

    // this.voices.forEach(voice => voice.draw(this.context, this.stave));
    // this.beams.forEach(beam => beam.setContext(this.context).draw());
    this.vf.draw();
  }

  getFactoryScore = (e) => {
    e.detail.factoryScore = this.score;
    e.detail.factory = this.vf;
  }

  // testing creating a slur
  // addSlur(notes) {
  //   this.vf.Curve({ from:notes[0], to: notes[5] });
  // }

}

window.customElements.define('vf-stave', VFStave);