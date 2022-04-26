import React from "react";
import PropTypes from "prop-types";
import { ViewButton } from '../viewButton';

//navigation bar that holds buttons to change between views in the app

export function NavBar(props) {
    const renderViews = (viewArray) => {
        return (
            <React.Fragment>
                {viewArray.map((view) => {
                    return (
                        <ViewButton
                            key={view}
                            view={view}
                            onChange={props.onChange}
                        />
                    );
                })}
            </React.Fragment>
        );
    };

    return (
        <div className="navBar">
            {renderViews([['KEYBOARD', 'KEYS'], ['OSCILLATOR', 'OSC'], ['EFFECTS', 'FX'], ['SEQUENCE', 'SEQ']])}
        </div>
    );
}

NavBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};
