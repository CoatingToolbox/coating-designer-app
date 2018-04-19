
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../redux/redux-mixin.js';

class CdTemplateElement extends PolymerElement {
  static get properties () {
    return {
    };
  }

  constructor() {
    // If you override the constructor, always call the 
    // superconstructor first.
    super();
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-template-element', CdTemplateElement);