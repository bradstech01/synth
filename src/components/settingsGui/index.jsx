import React from 'react';
import PropTypes from 'prop-types';

export class SettingsGui extends React.Component {
  constructor(props) {
    super(props);
    const synthSettings = this.props.synth.get();
    
    this.state = {
      synthSettings: synthSettings,
    };
  }

  static propTypes = {
    synth: PropTypes.object.isRequired,
  }

  handleChange = (e) => {
    let returnState = {...this.state};
    returnState['synthSettings'][e.target.attributes.section.nodeValue][e.target.name] = e.target.value;
    this.setState(returnState);
    let returnSettings = {};
    returnSettings = returnState['synthSettings'];
    this.props.synth.set(returnSettings);
  };

  renderSetting = (label,subProp,settingName,extraCss,min,max,step) => {
    return (
      <div className={'setting ' + extraCss}>
        <label>{label}</label>
        <input className='innerSetting slider'
          type='range' 
          section={subProp} 
          name={settingName} 
          min={min} 
          max={max} 
          value={this.state.synthSettings[subProp][settingName]}
          step={step}
          onChange={this.handleChange}
        />
        <input className='innerSetting'
          type='text' 
          section={subProp} 
          name={settingName} 
          min={min} 
          max={max} 
          value={this.state.synthSettings[subProp][settingName]}
          step={step}
          onChange={this.handleChange}
        />
      </div>
    );
  };
  
  renderSelectSetting = (subProp,settingName,optionAry) => {
    return (
    <React.Fragment>
          {optionAry.map(option => {
            return (
              <div key={option} className={'osc'+option} >
                <label>{option}</label>
                <input type='radio'
                name={settingName} 
                section={subProp} 
                value={option} 
                checked={this.state.synthSettings[subProp][settingName] === option}
                onChange={this.handleChange}/>
              </div>
            )
          })}
    </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='settingContainer osc'>
          <div className='settingsHdr'>oscillator</div>
          <div className='settingGrp'>
            {this.renderSelectSetting('oscillator','type',['sine','sawtooth','square','triangle'])}
          </div>
        </div>
        <div className='settingContainer lpEnv'>
          <div className='settingsHdr'>filter envelope</div>
          <div className='settingGrp'>
            {this.renderSetting('frequency','filter','frequency','lpFreq',0,44000,1)}
            {this.renderSetting('attack','filterEnvelope','attack','lpA',0,15,.01)}
            {this.renderSetting('decay','filterEnvelope','decay','lpD',0,15,.01)}
            {this.renderSetting('sustain','filterEnvelope','sustain','lpS',0,1,.01)}
            {this.renderSetting('release','filterEnvelope','release','lpR',0,15,.01)}
          </div>
        </div>
        <div className='settingContainer ampEnv'>
          <div className='settingsHdr'>volume envelope</div>
          <div className='settingGrp'>
            {this.renderSetting('attack','envelope','attack','ampA',0,15,.01)}
            {this.renderSetting('decay','envelope','decay','ampD',0,15,.01)}
            {this.renderSetting('sustain','envelope','sustain','ampS',0,1,.01)}
            {this.renderSetting('release','envelope','release','ampR',0,15,.01)}
          </div>     
        </div>  
      </React.Fragment>
    );
  }
}
