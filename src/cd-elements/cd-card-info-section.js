
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';

class CdCardInfoSection extends PolymerElement {
  static get properties () {
    return {
      title: String
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 2fr;
          padding: 32px 0px;
        }
        #left-layout {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        #right-layout {
          grid-row: 1 / 2;
          grid-column: 2 / 3;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        #right-layout ::slotted([wide]) {
          grid-column: 1 / 3;
        }
        #title-layout {
          display: flex;
          flex-direction: row;
          align-items: center
        }
        #title-layout #title-icon {
          width: 18px;
          height: 18px;
          margin-right: 12px;
          border-radius: 50%;
          background-color: var(--app-light-color);
        }
        #title-layout #title {
          font-size: 18px;
          font-weight: ;
          color: var(--app-primary-color);
        }
      </style>
      
      <div id='left-layout'>
        <div id='title-layout'>
          <div id='title-icon'></div>
          <div id='title'>[[title]]</div>
        </div>
      </div>
      
      <div id='right-layout'>
        <slot>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-card-info-section', CdCardInfoSection);