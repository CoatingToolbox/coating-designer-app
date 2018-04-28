
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../inputs/length-input.js';
import '../app-icons.js';

class CdTabletDesignerDimensions extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
      isRound: {type: Boolean, computed: '_computeIsRound(tablet.shape)'},
      dimensionUnits: {type: String, value: 'mm'}
    };
  }
  
  _computeIsRound(shape) {
    return shape === 'round';
  }
  
  _saveValue(e) {
    this.dispatch({
      type: e.target.dataset.redux,
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
      
        
        <card-with-toolbar title='Compressed Tablet'>
          <p slot='card-description'>
            Input the dimensions based on a compressed tablet.
          </p>
          
          <card-info-section title='Dimensions' icon='app-icons:ruler'>
            
            <length-input 
              label='Length' 
              value='{{tablet.length}}' 
              unit='{{dimensionUnits}}'
              data-redux='SET_TABLET_LENGTH' 
              on-value-changed='_saveValue'>
            </length-input>
            
            <length-input 
              hidden$='{{isRound}}' 
              label='Width' 
              value='{{tablet.width}}' 
              unit='{{dimensionUnits}}'
              data-redux='SET_TABLET_WIDTH' 
              on-value-changed='_saveValue'>
            </length-input>
            
            <length-input 
              label='Total Thickness' 
              value='{{tablet.totalThickness}}' 
              unit='{{dimensionUnits}}'
              data-redux='SET_TABLET_TOTAL_THICKNESS' 
              on-value-changed='_saveValue'>
            </length-input>
            
            <length-input 
              label='Band Thickness' 
              value='{{tablet.bandThickness}}' 
              unit='{{dimensionUnits}}'
              data-redux='SET_TABLET_BAND_THICKNESS' 
              on-value-changed='_saveValue'>
            </length-input>
          
          </card-info-section>
          
          
          
          <card-info-section title='Tablet Schematic' icon='app-icons:product-info'>
            <tablet-layout wide tablet='[[tablet]]'></tablet-layout>
          </card-info-section>
          
        </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-dimensions', CdTabletDesignerDimensions);