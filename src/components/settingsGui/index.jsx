import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';

export class SettingsGui extends React.Component {
  constructor(props) {
    super(props);
    let synthSettings = this.getDefaults();

    this.state = {
      synthSettings: synthSettings,
      fxSettings: {
        stereoWidener: {
          width: 0,
        },
        distortion: {
          distortion: 0,
        },
        eq: {
          low: 0,
          mid: 0,
          high: 0,
        },
        reverb: {
          wet: 1,
          preDelay: 0.01,
          decay: 1.5,
        },
        delay: {
          delayTime: 0.25,
          feedback: 0,
        },
        tremolo: {
          frequency: 10,
          depth: 0.5,
        },
        chorus: {
          frequency: 1.5,
          depth: 0.7,
        },
      },
    };

    this.fx = {
      stereoWidener: undefined,
      eq: undefined,
      distortion: undefined,
      compressor: undefined,
      reverb: undefined,
      delay: undefined,
      tremolo: undefined,
      chorus: undefined,
      LFO1: undefined,
      LFO2: undefined,
    };
  }

  static propTypes = {
    synth: PropTypes.object.isRequired,
    reverb: PropTypes.object,
  };

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'p') {
        console.log(this.fx);
        console.log(this.props.synth);
        console.log(this.props.synth.get());
        console.log(this.state);
      }
    });
  }

  /*componentDidUpdate(prevProps, prevState) {
    const synthSettings = { ...this.state['synthSettings'] };
    this.props.synth.set(synthSettings);
  }*/

  handleChange = (value, section, name) => {
    const newSetting = {};
    newSetting[section] = {};
    newSetting[section][name] = value;
    this.props.synth.set(newSetting);

    const returnState = { ...this.state.synthSettings };
    returnState[section][name] = value;

    this.setState(returnState);
  };

  handleFxChange = (e) => {
    const val = e.target.value;
    const param = e.target.attributes.param.nodeValue;
    const name = e.target.attributes.name.nodeValue;

    if (!this.fx[name]) {
      let newEffect;
      let target;
      switch (name) {
        case 'delay':
          newEffect = new Tone.FeedbackDelay().toDestination();
          target = this.props.synth;
          break;
        case 'reverb':
          newEffect = new Tone.Reverb().toDestination();
          target = this.props.synth;
          break;
        case 'chorus':
          newEffect = new Tone.Chorus().toDestination().start();
          target = this.props.synth;
          break;
        case 'tremolo':
          newEffect = new Tone.Tremolo().toDestination().start();
          target = this.props.synth;
          break;
        case 'eq':
          newEffect = new Tone.EQ3().toDestination();
          target = this.props.synth;
          break;
        case 'distortion':
          newEffect = new Tone.Distortion().toDestination();
          target = this.props.synth;
          break;
        case 'stereoWidener':
          newEffect = new Tone.StereoWidener().toDestination();
          target = this.props.synth;
          break;
        default:
          break;
      }
      this.fx[name] = newEffect;
      target.connect(newEffect).toDestination();
    }
    let returnState = { ...this.state };

    returnState.fxSettings[name][param] = val;
    let fxOptions = {};
    fxOptions[param] = val;
    this.fx[name].set(fxOptions);

    this.setState(returnState);
  };

  getDefaults = () => {
    const synthSettings = this.props.synth.get();
    const stateSettings = {
      oscillator: {
        type: synthSettings.oscillator.type,
      },
      envelope: {
        attack: synthSettings.envelope.attack,
        decay: synthSettings.envelope.decay,
        sustain: synthSettings.envelope.sustain,
        release: synthSettings.envelope.release,
      },
      filterEnvelope: {
        octaves: synthSettings.filterEnvelope.octaves,
        baseFrequency: synthSettings.filterEnvelope.baseFrequency,
        attack: synthSettings.filterEnvelope.attack,
        decay: synthSettings.filterEnvelope.decay,
        sustain: synthSettings.filterEnvelope.sustain,
        release: synthSettings.filterEnvelope.release,
      },
    };
    return stateSettings;
  };

  renderSynthSetting = (
    label,
    subProp,
    settingName,
    extraCss,
    min,
    max,
    step
  ) => {
    return (
      <div className={'setting gridCenter' + extraCss}>
        <label>{label}</label>
        <div className="sliderWrapper">
          <input
            className="innerSetting slider"
            type="range"
            min={min}
            max={max}
            value={this.state.synthSettings[subProp][settingName]}
            step={step}
            onChange={(e) => { this.handleChange(e.target.value, subProp, settingName) }}
          />
        </div>
        <span className="textCenter">
          {this.state.synthSettings[subProp][settingName]}
        </span>
      </div>
    );
  };

  renderSelectSetting = (subProp, settingName, optionAry) => {
    return (
      <div className="oscillatorSelect grid">
        {optionAry.map((option) => {
          return (
            <div key={option} className={'osc' + option}>
              <label className='radioContainer'>
                <input
                  key={option}
                  type="radio"
                  name={settingName}
                  section={subProp}
                  value={option}
                  checked={
                    this.state.synthSettings[subProp][settingName] === option
                  }
                  onChange={(e) => { this.handleChange(e.target.value, subProp, settingName) }}
                />
                <span>{option}</span>
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  renderFxSetting = (
    label,
    fxName,
    param,
    extraCss,
    changeHandler,
    min,
    max,
    step
  ) => {
    return (
      <div className={'setting ' + extraCss}>
        <label className="textCenter">{label}</label>
        <div className="sliderWrapper">
          <input
            className="innerSetting slider"
            type="range"
            name={fxName}
            param={param}
            min={min}
            max={max}
            value={this.state.fxSettings[fxName][param]}
            step={step}
            onChange={changeHandler}
          />
        </div>
        <span className="textCenter">
          {this.state.fxSettings[fxName][param]}
        </span>
      </div>
    );
  };

  renderOscillatorSelection = () => {
    return (
      <div className="oscillatorSelection">
        <div className="settingsHdr">oscillator</div>
        <div className="settingGrp">
          {this.renderSelectSetting('oscillator', 'type', [
            'sine',
            'sawtooth',
            'square',
            'triangle',
          ])}
        </div>
      </div>
    );
  };

  renderFilterEnvSettings = () => {
    return (
      <div className="lpfEnv settingBox">
        <div className="settingsHdr">filter env</div>
        <div className="settingGrp lpfSettings">
          {this.renderSynthSetting(
            'cutoff',
            'filterEnvelope',
            'baseFrequency',
            'lpFreq',
            0,
            500,
            1
          )}
          {this.renderSynthSetting(
            'env amt',
            'filterEnvelope',
            'octaves',
            'freq',
            0,
            24,
            0.01
          )}
          {this.renderSynthSetting(
            'attack',
            'filterEnvelope',
            'attack',
            'lpA',
            0,
            100,
            0.01
          )}
          {this.renderSynthSetting(
            'decay',
            'filterEnvelope',
            'decay',
            'lpD',
            0,
            100,
            0.01
          )}
          {this.renderSynthSetting(
            'sustain',
            'filterEnvelope',
            'sustain',
            'lpS',
            0,
            1,
            0.01
          )}
          {this.renderSynthSetting(
            'release',
            'filterEnvelope',
            'release',
            'lpR',
            0,
            24,
            0.01
          )}
        </div>
      </div>
    );
  };

  renderAmpEnvSettings = () => {
    return (
      <div className="ampEnv">
        <div className="settingsHdr">amp env</div>
        <div className="ampSettings">
          {this.renderSynthSetting(
            'attack',
            'envelope',
            'attack',
            '',
            0,
            4,
            0.01
          )}
          {this.renderSynthSetting(
            'decay',
            'envelope',
            'decay',
            '',
            0,
            4,
            0.01
          )}
          {this.renderSynthSetting(
            'sustain',
            'envelope',
            'sustain',
            '',
            0,
            1,
            0.01
          )}
          {this.renderSynthSetting(
            'release',
            'envelope',
            'release',
            '',
            0,
            24,
            0.01
          )}
        </div>
      </div>
    );
  };

  renderVoiceFx = () => {
    return (
      <div className="voiceFx">
        <div className="width">
          <div className="settingsHdr">width</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'stereo amt',
              'stereoWidener',
              'width',
              '',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
          </div>
        </div>
        <div className="eq">
          <div className="settingsHdr">equalizer</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'low',
              'eq',
              'low',
              'gc1 gr1',
              this.handleFxChange,
              -18,
              18,
              0.01
            )}
            {this.renderFxSetting(
              'mid',
              'eq',
              'mid',
              'gc2 gr1',
              this.handleFxChange,
              -18,
              18,
              0.01
            )}
            {this.renderFxSetting(
              'high',
              'eq',
              'high',
              'gc3 gr1',
              this.handleFxChange,
              -18,
              18,
              0.01
            )}
          </div>
        </div>
        <div className="distortion">
          <div className="settingsHdr">distortion</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'amount',
              'distortion',
              'distortion',
              '',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
          </div>
        </div>
      </div>
    );
  };

  renderTimeFx = () => {
    return (
      <div className="timeFx">
        <div className="delay">
          <div className="settingsHdr">delay</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'time',
              'delay',
              'delayTime',
              'gc1 gr1',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
            {this.renderFxSetting(
              'repeat',
              'delay',
              'feedback',
              'gc2 gr1',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
          </div>
        </div>
        <div className="reverb">
          <div className="settingsHdr">reverb</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'mix',
              'reverb',
              'wet',
              'gc1 gr1',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
            {this.renderFxSetting(
              'decay',
              'reverb',
              'decay',
              'gc2 gr1',
              this.handleFxChange,
              0,
              10,
              0.01
            )}
          </div>
        </div>
        <div className="chorus">
          <div className="settingsHdr">chorus</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'freq',
              'chorus',
              'frequency',
              'gc1 gr1',
              this.handleFxChange,
              0,
              10,
              0.01
            )}
            {this.renderFxSetting(
              'depth',
              'chorus',
              'depth',
              'gc2 gr1',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
          </div>
        </div>
        <div className="tremolo">
          <div className="settingsHdr">tremolo</div>
          <div className="settingGrp">
            {this.renderFxSetting(
              'freq',
              'tremolo',
              'frequency',
              'gc1 gr1',
              this.handleFxChange,
              0,
              10,
              0.01
            )}
            {this.renderFxSetting(
              'depth',
              'tremolo',
              'depth',
              'gc2 gr1',
              this.handleFxChange,
              0,
              1,
              0.01
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="settingsGuiLeft settingsGui">
          {this.renderOscillatorSelection()}
          {this.renderAmpEnvSettings()}
          {this.renderFilterEnvSettings()}
        </div>
        <div className="settingsGuiMid settingsGui">{this.renderVoiceFx()}</div>
        <div className="settingsGuiRight settingsGui">
          {this.renderTimeFx()}
        </div>
      </React.Fragment>
    );
  }
}
