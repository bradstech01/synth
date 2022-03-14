import React from 'react';

export class SettingsGui extends React.Component {
  constructor(props) {
    super(props);
    const synthSettings = this.props.synth.get();
    
    this.state = {
      synthSettings: synthSettings,
    };
  }

  handleChange = (e) => {
    let returnState = {...this.state};
    returnState['synthSettings'][e.target.attributes.section.nodeValue][e.target.name] = e.target.value;
    this.setState(returnState);
    let returnSettings = {};
    returnSettings = returnState['synthSettings'];
    this.props.synth.set(returnSettings);
  };

  renderSetting = (label,subProp,settingName,min,max,step) => {
    return (
      <div className='setting'>
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
    <div className='setting'>
          {optionAry.map(option => {
            return (
              <div key={option}>
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
    </div>
    );
  };

  render() {
    return (
      <div>
        <div className='settingGrp'>
          <div className='settingsHdr'>oscillator</div>
          {this.renderSelectSetting('oscillator','type',['sine','sawtooth','square','triangle'])}
        </div>
        <div className='settingGrp'>
          <div className='settingsHdr'>filter envelope</div>
          {this.renderSetting('frequency','filter','frequency',0,44000,1)}
          {this.renderSetting('attack','filterEnvelope','attack',0,15,.01)}
          {this.renderSetting('decay','filterEnvelope','decay',0,15,.01)}
          {this.renderSetting('sustain','filterEnvelope','sustain',0,1,.01)}
          {this.renderSetting('release','filterEnvelope','release',0,15,.01)}
        </div>
        <div className='settingGrp'>
          <div className='settingsHdr'>volume envelope</div>
          {this.renderSetting('attack','envelope','attack',0,15,.01)}
          {this.renderSetting('decay','envelope','decay',0,15,.01)}
          {this.renderSetting('sustain','envelope','sustain',0,1,.01)}
          {this.renderSetting('release','envelope','release',0,15,.01)}
        </div>       
      </div>
    );
  }
}
