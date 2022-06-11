import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from '../features/keyboard/keyboard';
import Sequencer from '../features/sequencer/sequencer';
import { Visualizer } from '../features/visualizer/visualizer';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
function MusicGui() {
    return (
        <div className='musicGui'>
            <div className="keyboardWrapper">
                <div className='visualizerContainer'>
                    <Visualizer />
                </div>
                <Keyboard />
            </div>
            <Sequencer />
        </div>
    );
}

export default React.memo(MusicGui);
