import React from "react";
import PropTypes from "prop-types";

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function ViewButton(props) {
    return (
        <div className="navButton">
            <label className='radioContainer'>
                <input
                    type="radio"
                    value={props.view}
                    checked={
                        props.activeView === props.view
                    }
                    onChange={(e) => { props.onChange(e.target.value) }}
                />
                <div className='centerY fitContainer'>
                    <div>{props.view}</div>
                </div>
            </label>
        </div >
    );
}
