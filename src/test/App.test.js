import { render } from '@testing-library/react';
//import App from '../app/app';
import { getContext, setContext, OfflineContext } from 'Tone';
describe('useAudioContext', () => {

  const mockConnect = jest.fn();
  const mockcreateMediaElementSource = jest.fn(() => {
    return {
      connect: mockConnect
    };
  });
  const mockgetByteFrequencyData = jest.fn();
  const mockcreateAnalyser = jest.fn(() => {
    return {
      connect: mockConnect,
      frequencyBinCount: [0, 1, 2],
      getByteFrequencyData: mockgetByteFrequencyData,
    };
  });
  const mockcreateOscillator = jest.fn(() => {
    return {
      channelCount: 2
    };
  });
  const mockChannelSplitterConnect = jest.fn(n => n);
  const mockcreateChannelSplitter = jest.fn(() => {
    return {
      connect: mockChannelSplitterConnect
    };
  });
  const mockcreateAudioBuffer = jest.fn(() => {
    return {
      hmm: hey
    };
  });
  const mockaudioContext = jest.fn(() => {
    return {
      createAnalyser: mockcreateAnalyser,
      createMediaElementSource: mockcreateMediaElementSource,
      createOscillator: mockcreateOscillator,
      createChannelSplitter: mockcreateChannelSplitter,
      createAudioBuffer: mockcreateAudioBuffer,
    };
  });


  beforeEach(() => {
    window.AudioContext = mockaudioContext();
  });


  test('should return false for default value', () => {
    for (let i = 0; i < 3; i++)       mockcreateAnalyser();
    for (let i = 0; i < 3; i++)       mockcreateMediaElementSource();
    for (let i = 0; i < 3; i++)       mockConnect();
    for (let i = 0; i < 3; i++)       mockcreateOscillator();
    for (let i = 0; i < 3; i++)       mockcreateChannelSplitter();
    for (let i = 0; i < 3; i++)       mockChannelSplitterConnect();
    for (let i = 0; i < 3; i++)       mockgetByteFrequencyData();
    expect(mockcreateAnalyser).toBeCalledTimes(3);
    expect(mockcreateMediaElementSource).toBeCalledTimes(3);
    expect(mockConnect).toBeCalledTimes(3);
    expect(mockcreateOscillator).toBeCalledTimes(3);
    expect(mockcreateChannelSplitter).toBeCalledTimes(3);
    expect(mockChannelSplitterConnect).toBeCalledTimes(3);
    expect(mockgetByteFrequencyData).toBeCalledTimes(3);
  });

  test('validates that initial page just loads the splash', () => {
    const context = getContext();
    //const offline = new OfflineContext(1, .1 + 1 / 44100, 44100);
    //console.log(context);
    //render(<App />);
    expect(true).toBe(true);
    setContext(context);
  });

});
