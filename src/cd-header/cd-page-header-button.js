
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';

class CdPageHeaderButton extends PolymerElement {
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
          position: relative;
          padding: 12px 24px;
          border-radius: 6px;
          color: var(--text-light-color);
          background-color: var(--light-gray-color);
          transition: 0.2s all;
        }
        :host(:hover) {
          color: var(--white-color);
          background-color: var(--app-accent-color);
          transition: 0.3s all;
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
customElements.define('cd-page-header-button', CdPageHeaderButton);