import React from "react";
import PropTypes from "prop-types";

function NavButton(props) {
    return (
        <li>
            <label className='radioContainer'>
                <input
                    type="radio"
                    value={props.view[0]}
                    checked={props.activeView === props.view[0]}
                    onChange={(e) => { props.onChange(e.target.value); }}
                />
                <div className={props.view[0] + ' centerY fitContainer'}></div>
            </label>
        </li>
    );
}
NavButton.propTypes = {
    view: PropTypes.array.isRequired,
};

export default React.memo(NavButton);
