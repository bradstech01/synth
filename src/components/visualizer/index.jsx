import React from 'react';

/**
 * Uses requestAnimationFrame to drive a roughly 60 FPS output. 
 * Holds the audio time domain data in state, which is passed via props to a Waveform component that does the real rendering.
 * TODO: Implement a way to "isolate" waveform/snapshot a waveform
 */
export class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    const analyser = this.props.audioCtx.createAnalyser();
    this.props.synth.connect(analyser);
    analyser.fftSize = 4096;
    const bufferLength = analyser.frequencyBinCount;

    this.analyser = analyser;
    this.bufferLength = bufferLength;
    
    const dataArray = new Uint8Array(bufferLength);
    this.state = {dataArray: dataArray};
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  updateAnimationState = () => {
    const newDataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(newDataArray);
    this.setState(prevState => ({ dataArray: newDataArray }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  render() {
    return (
      <VisualWaveform
        dataArray={this.state.dataArray}
        bufferLength={this.bufferLength}
      />
    );
  }
}

/**
 * Uses props.dataArray to output audio data on an HTML canvas element. 
 * TODO: Convert to functional component & test. 
 */

class VisualWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {

    if (!this.canvasRef.current) return () => {};

    const canvas = this.canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    canvasCtx.fillStyle = 'rgb(0,0,0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

    canvasCtx.beginPath();

    const sliceWidth = (WIDTH * 1.0) / this.props.bufferLength;
    let x = 0;

    for (let i = 0; i < this.props.bufferLength; i++) {
      const v = (this.props.dataArray[i] ?? 0) / 128.0;
      const y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(WIDTH, HEIGHT / 2);
    canvasCtx.stroke();
  }

  render() {
    return <canvas className='waveform' ref={this.canvasRef}></canvas>;
  } 
}