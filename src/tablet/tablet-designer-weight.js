
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../inputs/mass-input.js';

class TabletDesignerWeight extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
    };
  }
  
  _saveValue(e) {
    this.dispatch({
      type: "SET_TABLET_WEIGHT",
      value: e.detail.value
    });
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
      </style>
      
        <card-with-toolbar title='Tablet Weight'>
          <p slot='card-description'>
            Provide additional details on the tablet weight.
          </p>
        
          <card-info-section title='Tablet Weight' icon='app-icons:weight'>
            <mass-input 
              label='Tablet Weight' 
              value='{{tablet.weight}}' 
              unit='mg' 
              on-value-changed='_saveValue'>
            </mass-input>
          </card-info-section>
          
        </card-with-toolbar>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-weight', TabletDesignerWeight);