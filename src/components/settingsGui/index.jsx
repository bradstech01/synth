import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';

export class SettingsGui extends React.Component {
  constructor(props) {
    super(props);
    const synthSettings = this.props.synth.get();

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

  componentDidUpdate(prevProps, prevState) {
    let synthSettings = Object.assign({}, this.state['synthSettings']);
    //this.props.synth.releaseAll(Tone.immediate());
    this.props.synth.set(synthSettings);
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'p') {
        console.log(this.fx);
        console.log(this.props.synth);
        console.log(this.props.synth.get());
      }
    });
  }

  handleChangeNumeric = (e) => {
    e.stopPropagation();
    if (/[0-9]{1,}\.{0,1}[0-9]{1,}/.exec(e.target.value)) {
      let returnState = { ...this.state };
      returnState['synthSettings'][e.target.attributes.section.nodeValue][
        e.target.name
      ] = e.target.value;
      this.setState(returnState);
    }
  };

  handleChange = (e) => {
    let returnState = Object.assign({}, this.state.synthSettings);
    returnState['synthSettings'][e.target.attributes.section.nodeValue][
      e.target.name
    ] = e.target.value;
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
        <label className="gc1 gr1">{label}</label>
        <div className="sliderWrapper">
          <input
            className="innerSetting slider gc1 gr2"
            type="range"
            section={subProp}
            name={settingName}
            min={min}
            max={max}
            value={this.state.synthSettings[subProp][settingName]}
            step={step}
            onChange={this.handleChangeNumeric}
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
      <React.Fragment>
        {optionAry.map((option) => {
          return (
            <div key={option} className={'osc' + option}>
              <label>{option}</label>
              <input
                type="radio"
                name={settingName}
                section={subProp}
                value={option}
                checked={
                  this.state.synthSettings[subProp][settingName] === option
                }
                onChange={this.handleChange}
              />
            </div>
          );
        })}
      </React.Fragment>
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
      <div className="settingContainer gc1 gr1">
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
      <div className="settingContainer gc1 gr2">
        <div className="settingsHdr">filter env</div>
        <div className="settingGrp">
          {this.renderSynthSetting(
            'env amt',
            'filterEnvelope',
            'octaves',
            'freq gc1 gr1',
            0,
            24,
            0.01
          )}
          {this.renderSynthSetting(
            'env frequency',
            'filterEnvelope',
            'baseFrequency',
            'lpFreq gc3 gr1',
            0,
            500,
            1
          )}
          {this.renderSynthSetting(
            'attack',
            'filterEnvelope',
            'attack',
            'lpA gc1 gr2',
            0,
            10,
            0.01
          )}
          {this.renderSynthSetting(
            'decay',
            'filterEnvelope',
            'decay',
            'lpD gc2 gr2',
            0,
            10,
            0.01
          )}
          {this.renderSynthSetting(
            'sustain',
            'filterEnvelope',
            'sustain',
            'lpS gc3 gr2',
            0,
            1,
            0.01
          )}
          {this.renderSynthSetting(
            'release',
            'filterEnvelope',
            'release',
            'lpR gc4 gr2',
            0,
            4,
            0.01
          )}
        </div>
      </div>
    );
  };

  renderAmpEnvSettings = () => {
    return (
      <div className="settingContainer gc2 gr2">
        <div className="settingsHdr">amp env</div>
        <div className="settingGrp">
          {this.renderSynthSetting(
            'attack',
            'envelope',
            'attack',
            'ampA gc1 gr1',
            0,
            4,
            0.01
          )}
          {this.renderSynthSetting(
            'decay',
            'envelope',
            'decay',
            'ampD gc2 gr1',
            0,
            4,
            0.01
          )}
          {this.renderSynthSetting(
            'sustain',
            'envelope',
            'sustain',
            'ampS gc3 gr1',
            0,
            1,
            0.01
          )}
          {this.renderSynthSetting(
            'release',
            'envelope',
            'release',
            'ampR gc4 gr1',
            0,
            4,
            0.01
          )}
        </div>
      </div>
    );
  };

  renderVoiceFx = () => {
    return (
      <React.Fragment>
        <div className="settingContainer gc2 gr1 grid gridCenter">
          <div className="settingsHdr gc1 gr1">width</div>
          <div className="settingGrp gc1 gr2">
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
        <div className="settingContainer gc3 gr1 grid gridCenter">
          <div className="settingsHdr gc3 gr1">eq</div>
          <div className="settingGrp gridCenter gc3 gr2 grid">
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
        <div className="settingContainer gc4 gr1 grid gridCenter">
          <div className="settingsHdr gc5 gr1">distortion</div>
          <div className="settingGrp gridCenter gc5 gr2">
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
      </React.Fragment>
    );
  };

  renderTimeFx = () => {
    return (
      <React.Fragment>
        <div className="settingContainer gc6 gr1 grid gridCenter">
          <div className="settingsHdr gc1 gr1">delay</div>
          <div className="settingGrp gridCenter gc1 gr2">
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
        <div className="settingContainer gc7 gr1 grid gridCenter">
          <div className="settingsHdr gc3 gr1">reverb</div>
          <div className="settingGrp gridCenter gc3 gr2 grid">
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
        <div className="settingContainer gc7 gr2 grid gridCenter">
          <div className="settingsHdr gc5 gr1">chorus</div>
          <div className="settingGrp gridCenter gc5 gr2">
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
        <div className="settingContainer gc8 gr1 grid gridCenter">
          <div className="settingsHdr gc5 gr1">tremolo</div>
          <div className="settingGrp gridCenter gc5 gr2">
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
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="settingsGuiLeft settingsGui grid gridCenter">
          {this.renderOscillatorSelection()}
          {this.renderFilterEnvSettings()}
        </div>
        <div className="settingsGuiMid settingsGui grid gridCenter">
          {this.renderAmpEnvSettings()}
          {this.renderVoiceFx()}
        </div>
        <div className="settingsGuiRight settingsGui grid gridCenter">
          {this.renderTimeFx()}
        </div>
      </React.Fragment>
    );
  }
}
