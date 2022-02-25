/*import {PtsCanvas} from "react-pts-canvas";
import * as Tone from 'tone';

export class Visualizer extends PtsCanvas {
  constructor(props) {
    super(props);
    this.state = {};

    this.pointsPerSample = 5;

    //Based on the bin size and sample rate, this tells us how much time in seconds our bin holds.
    this.binLength = this.props.sound.binSize / this.props.sound.sampleRate;
  }

  start(bound, space) {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 190) {
      if (!this.props.debug) {
        console.log('Verbose debugging turned on');
        this.props.debug = true;
      }
      else if (this.props.debug) {
        console.log('Verbose debugging turned off');
        this.props.debug = false;
      }
    }
    else if (e.keyCode === 188){
      console.log('Wavelength: '+this.waveLength);
      console.log('bin length: '+this.binLength);
      console.log('number samples needed: '+this.numberSamplesNeeded);
    }
  }

  animate(time, ftime) {
    let tdWave;

    //For debugging purposes only
    if (this.time === undefined) {
      this.time = time;
    }

    let td = this.props.sound.timeDomainTo( this.space.size ); //maps the "time domain" to the space

    if (this.props.frequency > 0) {
      this.waveLength = 1/this.props.frequency;
      this.numberSamplesNeeded = Math.floor(this.props.sound.binSize / (this.binLength / this.waveLength)) + 1;
    }
    else {
      this.numberSamplesNeeded = 0;
    }

    let positiveStartIdx = 0;

    tdWave = td.slice(0, 0 + this.numberSamplesNeeded);

    let max;

    for (let i = 0; i < tdWave.length; i++) {
      tdWave[i].x = i * this.space.size.x / tdWave.length;
      if ((max === undefined) || (tdWave[i].y > max)) {
        max = tdWave[i].y;
      }
    }

    let mult = Math.pow(max,-1);

    for (let i = 0; i < tdWave.length; i++) {
      tdWave[i].y = ((tdWave[i].y * mult * this.space.size.y));
    }

    //Generate a curve; will end up being a Pts Group of order (this.pointsPerSample * tdWave.length)

    if (false){//((tdWave.length === undefined) || (tdWave.length === 0 || tdWave.length === 1 || tdWave.length === 2)) {
      this.form.strokeOnly("#f06", 5 ).line(new Pt(this.space.center.x - this.space.width/2, this.space.center.y),new Pt(this.space.center.x + this.space.width/2, this.space.center.y));
      if (this.props.debug && (time - (this.time) > 3000)) {
        console.log('yeehee!!');
      }
    }
    else if (tdWave.length !== undefined && tdWave.length > 0) {
      this.form.strokeOnly("#f06", 5 ).line( tdWave );
      if (this.props.debug && (time - (this.time) > 3000)) {
        console.log('yoohoo!!');
      }
    }


    if (this.props.debug && (time - (this.time) > 3000)) {
      console.log('Still kickin');
      console.log(td);
      console.log(tdWave);
      console.log('Samples needed: ' + this.numberSamplesNeeded);
      console.log('Start index: ' + positiveStartIdx);
      console.log('End index: ' + (positiveStartIdx + this.NumberSamplesNeeded));
      console.log('Center info: ');
      console.log(this.space.center);
      console.log(this.space.center.y);
      console.log('Sample rate??: ');
      console.log(this.props.sound.sampleRate);
      console.log(new Tone.Gain().toFrequency());
      this.time = time;
    }

  }
}
*/