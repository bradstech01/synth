import React from "react";
import PropTypes from "prop-types";
import ViewButton from './navButton';

//navigation bar that holds buttons to change between views in the app

function NavBar(props) {
    const renderViews = (viewArray) => {
        return (
            <>
                {viewArray.map((view) => {
                    return (
                        <ViewButton
                            key={view}
                            view={view}
                            onChange={props.onChange}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <nav >
            <ul className="navBar">
                {renderViews([['keyboard', 'keys'], ['oscillator', 'osc'], ['system', 'sys']])}
            </ul>
        </nav>
    );
}

NavBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default React.memo(NavBar);
