import React from "react";
import PropTypes from "prop-types";
//import Styles from '../../css/index.scss';
//TODO - figure out how to get that styles import right

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

//TODO: add window size to state so it can trigger updates to ensure the right label shows
export function ViewButton(props) {
    return (
        <label className='radioContainer'>
            <input
                type="radio"
                value={props.view[0]}
                checked={
                    props.activeView === props.view[0]
                }
                onChange={(e) => { props.onChange(e.target.value); }}
            />
            <h1 className='centerY fitContainer'>
                {window.innerWidth < 451 ? <div>{props.view[1]}</div> : <div>{props.view[0]}</div>}
            </h1>
        </label>
    );
}
ViewButton.propTypes = {
    view: PropTypes.array.isRequired,
};
