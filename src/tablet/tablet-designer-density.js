
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../inputs/density-input.js';

class TabletDesignerDensity extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
    };
  }
  
  _saveValue(e) {
    this.dispatch({
      type: "SET_TABLET_BULK_DENSITY",
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
        [hidden] {
          visibility: hidden !important;
        }
      </style>
      
        <card-with-toolbar title='Tablet Bulk Density'>
          <p slot='card-description'>
            Provide additional details on the bulk density.
          </p>
          
          <card-info-section title='Bulk Density' icon='app-icons:density'>
            <density-input
              label='Bulk Density' 
              value='{{tablet.bulkDensity}}' 
              unit='g/ml'
              on-value-changed='_saveValue'>
            </density-input>
          </card-info-section>
          
        </card-with-toolbar>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-density', TabletDesignerDensity);