import { render,unmountComponentAtNode } from 'react-dom';
import App from './App.jsx';
import React from 'react';

class WebComponent extends HTMLElement {

  connectedCallback() {
      render(<App />, this);
  }

  disconnectedCallback() {
    unmountComponentAtNode(this);
  }

}

const ELEMENT_ID = 'dwtc-checkout';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}