
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';

class CdPageTitle extends PolymerElement {

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          font-size: 24px;
          margin: 0px 16px;
          color: var(--white-color);
          flex-grow: 1;
        }
      </style>
      
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-page-title', CdPageTitle);