import React from "react";
import PropTypes from "prop-types";
import { ViewButton } from '../viewButton';

//navigation bar that holds buttons to change between views in the app

export function NavBarInner(props) {
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
            {renderViews([['keyboard', 'keys'], ['oscillator', 'osc'], ['system', 'sys']])}
        </div>
    );
}

NavBarInner.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export const NavBar = React.memo(NavBarInner);
