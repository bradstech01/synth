import React from "react";
import PropTypes from "prop-types";
import NavButton from './navButton';

//navigation bar that holds buttons to change between views in the app

function NavBar(props) {
    const renderViews = (viewArray) => {
        return (
            <>
                {viewArray.map((view) => {
                    return (
                        <NavButton
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
                {renderViews([['keyboard', '../assets/img/keys.png'], ['oscillator', '../assets/img/sine.svg'], ['system', '../assets/img/gear.svg']])}
            </ul>
        </nav>
    );
}

NavBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default React.memo(NavBar);
