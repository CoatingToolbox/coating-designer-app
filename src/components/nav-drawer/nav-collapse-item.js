
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class NavCollapseItem extends PolymerElement {
  static get properties () {
    return {
      label: String,
      opened: { type: Boolean, value: false, reflectToAttribute: true }
    };
  }
  
  toggle() {
      this.opened = !this.opened;
  }

  static get template () {
    return html`
      <style>
        
        :host {
          display: block;
          padding: 0px 0px 0px 16px;
          font-size: 16px;
        }
        #label {
          padding: 8px 0px;
        }
        #collapse {
          min-height: 0px;
          max-height: 0px;
          overflow: hidden;
          transition: all 0.2s;
        }
        :host([opened]) #collapse {
          min-height: 50px;
          max-height: 100%;
          transition: all 0.2s;
        }
      </style>
      
      <div id='label' on-click='toggle'>[[label]]</div>
      <div id='collapse'>
        <slot></slot>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-collapse-item', NavCollapseItem);