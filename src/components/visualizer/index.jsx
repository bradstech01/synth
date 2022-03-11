import * as Tone from 'tone';
import React, { Component } from 'react';


export class Visualizer extends Component {
  constructor(props) {
    super(props);
    const analyser = this.props.audioCtx.createAnalyser();
    this.props.synth.connect(analyser);
    analyser.fftSize = 2048;
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
      <Waveform
        dataArray={this.state.dataArray}
        bufferLength={this.bufferLength}
      />
    );
  }
}

class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
  }

  componentDidUpdate() {

    if (!this.canvasRef.current) return () => {};

    const canvas = this.canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    canvasCtx.fillStyle = "rgb(0,0,0)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = "rgb(255, 255, 255)";

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