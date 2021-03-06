
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class PageLayout extends PolymerElement {
  
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          max-width: 900px;
          margin: auto;
        }
      </style>
      
      <slot></slot>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-layout', PageLayout);