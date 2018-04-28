
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../card/card-info-item.js';

class TabletDesignerReview extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
    };
  }
  
  _saveChanges() {
    this.dispatchEvent(new CustomEvent('save-changes'));
  }
  _cancelChanges() {
    this.dispatchEvent(new CustomEvent('cancel-changes'));
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        card-info-section + card-info-section {
          border-top: var(--border-line);
        }
        #button-layout {
          display: flex;
          justify-content: flex-start;
          padding: 24px 0px;
        }
        card-with-toolbar p {
          max-width: 600px;
        }
        card-button + card-button {
          margin-left: 48px;
        }
        #cancel-button {
          background-color: var(--text-light-color);
        }
      </style>
      
      <card-with-toolbar title='Calculate Tablet Properties'>
          
        <p wide>
          With the provided information other tablet properties will be calculated. This includes
          properties useful for coating such as tablet surface area and batch volume.
        </p>
        
        <div id='button-layout'>
          <card-button id='calculate-button' label='Calculate Tablet' on-click='_saveChanges'></card-button>
          <card-button id='cancel-button' label='Cancel' on-click='_cancelChanges'></card-button>
        </div>
          
      </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-review', TabletDesignerReview);