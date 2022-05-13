import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import './fonts/MajorMono/MajorMonoDisplay-Regular.ttf';
import './fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf';
import Synth from './components/synth';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div className='app'>
      <Synth />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
