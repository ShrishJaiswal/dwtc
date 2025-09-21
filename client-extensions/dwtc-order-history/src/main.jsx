import React from 'react';
import App from './App.jsx';
import { render,unmountComponentAtNode } from 'react-dom';

class WebComponent extends HTMLElement {

  connectedCallback() {
      render(<App />, this);
  }

  disconnectedCallback() {
    unmountComponentAtNode(this);
  }

}

const ELEMENT_ID = 'dwtc-order-history';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}