import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleParticles } from './systemSettingsSlice';


//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function GuiSettings() {
    const dispatch = useDispatch();
    const particlesOn = useSelector(state => state.systemSettings.particlesOn);

    return (
        <div className="guiSettings">
            <h2>gui settings</h2>
            <label>particles on</label>
            <input
                type="checkbox"
                checked={particlesOn}
                onChange={() => dispatch(toggleParticles())}
            />
        </div>
    );
}

export default React.memo(GuiSettings);