
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '../app-icons.js';

class NavIcon extends PolymerElement {
  static get properties () {
    return {
      link: String,
      icon: String
    };
  }
  
  ready() {
    super.ready();
    this.addEventListener('click', () => {
      window.location = this.link;
    });
  }
  
  static get template () {
    return html`
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          margin: 0px 4px;
          color: var(--text-light-color);
        }
        iron-icon {
          width: 16px;
          height: 16px;
        }
        :host(:hover) {
          color: var(--app-accent-color);
        }
        
      </style>
      
      <iron-icon icon='[[icon]]'></iron-icon>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-icon', NavIcon);