import React from "react";
import PropTypes from "prop-types";

function ViewButton(props) {
    return (
        <li>
            <label className='radioContainer'>
                <input
                    type="radio"
                    value={props.view[0]}
                    checked={props.activeView === props.view[0]}
                    onChange={(e) => { props.onChange(e.target.value); }}
                />
                <h1 className='centerY fitContainer'>
                    {window.Width < 451 ? <>{props.view[1]}</> : <>{props.view[0]}</>}
                </h1>
            </label>
        </li>
    );
}
ViewButton.propTypes = {
    view: PropTypes.array.isRequired,
};

export default React.memo(ViewButton);
