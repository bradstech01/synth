import React from "react";
import PropTypes from "prop-types";

/**
 * Uses props.dataArray to output audio data on an HTML canvas element.
 */

function Oscilloscope(props) {
    const canvasRef = React.useRef(null);
    React.useEffect(draw);

    function draw() {
        if (!canvasRef.current) return () => { };

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");

        if (!canvasCtx) return;

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        canvasCtx.fillStyle = "rgb(0,0,0)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = "rgb(255, 255, 255)";

        canvasCtx.beginPath();

        const sliceWidth = (WIDTH * 1.0) / props.bufferLength;
        let x = 0;

        for (let i = 0; i < props.bufferLength; i++) {
            const v = (props.dataArray[i] ?? 0) / 128.0;
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

    return <canvas className="waveform" ref={canvasRef} />;
}

Oscilloscope.propTypes = {
    bufferLength: PropTypes.number.isRequired,
    dataArray: PropTypes.object.isRequired,
};

export default React.memo(Oscilloscope);
