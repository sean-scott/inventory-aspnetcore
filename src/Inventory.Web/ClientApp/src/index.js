import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { loadTheme } from 'office-ui-fabric-react';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

initializeIcons();

loadTheme({
  palette: {
    themePrimary: '#4c2c0c',
    themeLighterAlt: '#eaded2',
    themeLighter: '#d6c1ad',
    themeLight: '#c2a78b',
    themeTertiary: '#af8e6d',
    themeSecondary: '#9b7752',
    themeDarkAlt: '#87613b',
    themeDark: '#744e28',
    themeDarker: '#603c18',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#bab8b7',
    neutralSecondary: '#a3a2a0',
    neutralPrimaryAlt: '#8d8b8a',
    neutralPrimary: '#323130',
    neutralDark: '#605e5d',
    black: '#494847',
    white: '#ffffff',
  }
});