
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';

class CardButton extends PolymerElement {
  static get properties () {
    return {
      label: String
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 8px 24px;
          border-radius: 6px;
          background-color: var(--app-accent-color);
          color: var(--white-color);
        }
        :host(:hover) {
          cursor: pointer;
        }
        #label {
          font-size: 14px;
        }
      </style>
      
      <div id='label'>[[label]]</div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('card-button', CardButton);