
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-info-section.js';

class CdTabletDesignerReview extends ReduxMixin(PolymerElement) {
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
      </style>
      
        <cd-card-with-toolbar title='Review & Save'>
          
          <cd-card-info-section title='Tablet Schematic' icon='cd-icons:product-info'>
            <cd-tablet-layout wide tablet='[[tablet]]'></cd-tablet-layout>
          </cd-card-info-section>
          
          <cd-card-info-section title='Save' icon='cd-icons:save'>
            
            <p wide>
              With the above information other tablet properties are calculated. This includes
              properties useful for coating such as tablet surface area and batch volume.
            </p>
            
            <cd-card-button id='review-save-button' label='Save & Calculate' on-click='_saveChanges'></cd-card-button>
          
          </cd-card-info-section>
        
        </cd-card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-designer-review', CdTabletDesignerReview);