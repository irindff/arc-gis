import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { WebMapView } from "./components/webMapView/WebMapView";

ReactDOM.render(
  <React.StrictMode>
    <WebMapView/>
  </React.StrictMode>,
  document.getElementById('root')
);

