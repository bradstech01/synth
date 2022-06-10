import React from "react";
import PropTypes from "prop-types";
import Setting from './setting';

import { delay, reverb, chorus, tremolo } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function TimeFxBox(props) {
    return (
        <>
            <div className="delay">
                <h2>delay</h2>
                <div className="showAsRows">
                    <Setting definition={delay.settings.delayTime} type={delay.type} label="time" settings={props.settings} onChange={props.onChange} />
                    <Setting definition={delay.settings.feedback} type={delay.type} label="rpt" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
            <div className="reverb">
                <h2>reverb</h2>
                <div className="showAsRows">
                    <Setting definition={reverb.settings.decay} type={reverb.type} label="time" settings={props.settings} onChange={props.onChange} />
                    <Setting definition={reverb.settings.wet} type={reverb.type} label="mix" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
            <div className="chorus">
                <h2>chorus</h2>
                <div className="showAsRows">
                    <Setting definition={chorus.settings.frequency} type={chorus.type} label="freq" settings={props.settings} onChange={props.onChange} />
                    <Setting definition={chorus.settings.depth} type={chorus.type} label="amt" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
            <div className="tremolo">
                <h2>tremolo</h2>
                <div className="showAsRows">
                    <Setting definition={tremolo.settings.frequency} type={tremolo.type} label="freq" settings={props.settings} onChange={props.onChange} />
                    <Setting definition={tremolo.settings.depth} type={tremolo.type} label="amt" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
        </>
    );
}
TimeFxBox.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(TimeFxBox);