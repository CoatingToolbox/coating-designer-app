
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-info-section.js';
import '../cd-inputs/cd-mass-input.js';
import '../cd-inputs/cd-density-input.js';

class CdTabletDesignerWeight extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
    };
  }
  
  _saveChanges() {
    this.dispatch({
      type: "LOAD_TABLET_FROM_LIBRARY",
      value: this.tablet
    });
    window.location = '#/tablet/overview';
  }
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        cd-card-info-section + cd-card-info-section {
          border-top: var(--border-line);
        }
        [hidden] {
          visibility: hidden !important;
        }
      </style>
      
        <cd-card-with-toolbar title='Weight & Density'>
        
          <cd-card-info-section title='Weight' icon='cd-icons:weight'>
            <cd-mass-input label='Tablet Weight' value='{{tablet.weight}}' unit='mg'></cd-mass-input>
          </cd-card-info-section>
          
          <cd-card-info-section title='Density' icon='cd-icons:density'>
            <cd-density-input label='Bulk Density' value='{{tablet.bulkDensity}}' unit='g/ml'></cd-density-input>
          </cd-card-info-section>
          
        </cd-card-with-toolbar>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-designer-weight', CdTabletDesignerWeight);