
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';

class PageHeader extends PolymerElement {
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
          background-color: var(--app-primary-color);
          color: var(--white-color);
          padding: 48px 0px 48px 0px;
        }
        #title ::slotted(*) {
          font-size: 48px;
          font-weight: bold;
          text-align: center;
        }
        #description ::slotted(*) {
          max-width: 600px;
          margin: auto;
          text-align: center;
          margin: 0px auto;
        }
        #buttons {
          max-width:  600px;
          margin: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        #buttons ::slotted(*) {
          margin: 32px 16px 0px;
        }
      </style>
      
    
        <div id='title'>
          <slot name='title'></slot>
        </div>
        
        <div id='description'>
          <slot name='description'></slot>
        </div>
        <div id='buttons'>
          <slot name='button'></slot>
        </div>
        <slot></slot>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-header', PageHeader);