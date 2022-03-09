/*import * as Tone from 'tone';
import React, { Component } from 'react';


export class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  return (
    <div>
      <StreamVis synth={this.props.synth} context={this.props.context}/>
    </div>
  );
}

function visualize(canvas, stream) {
  const audioCtx = this.props.context;
  const canvasCtx = canvas.getContext("2d");

  const source = this.props.synth;

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);

  function draw() {
    if (!canvasCtx) return;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(180, 180, 180)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    const sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = (dataArray[i] ?? 0) / 128.0;
      const y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

  return draw;
}

function StreamVis(props) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef.current) return () => {};
    const draw = visualize(canvasRef.current, stream);
    let lastReq;
    function reqDraw() {
      lastReq = requestAnimationFrame(() => {
        draw();
        reqDraw();
        // TODO: this happens too frequently...
      });
    }
    reqDraw();
    return () => {
      cancelAnimationFrame(lastReq);
    };
  }, [stream]);
  return <canvas ref={canvasRef} />;
}
*/