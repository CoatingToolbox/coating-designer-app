
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../cd-elements/cd-card-with-toolbar.js';
import '../cd-elements/cd-card-button.js';
import '../cd-elements/cd-card-info-section.js';
import '../cd-elements/cd-tablet-layout.js';
import '../cd-inputs/cd-text-input.js';
import '../cd-inputs/cd-dropdown-input.js';
import '../cd-inputs/cd-length-input.js';
import '../cd-inputs/cd-mass-input.js';
import '../cd-inputs/cd-density-input.js';
import { ReduxMixin } from '../redux/redux-mixin.js';

class CdTabletDesignPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
      dosageOptions: { 
        type: Array, 
        value: function() {
          return ["Tablet", "Softgel", "Hard Capsule"];
        }
      },
      dimensionUnits: {type: String, value: 'mm'}
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
          width: 100%;
          max-width: 964px;
          margin: auto;
          padding: 48px 0px;
        }
        #page-title {
          font-size: 36px;
          font-weight: lighter;
        }
        cd-card-info-section + cd-card-info-section {
          border-top: var(--border-line);
        }
        .capitalize {
          text-transform: capitalize;
        }
        [hidden] {
          display: none !important;
        }
      </style>
      
      <div id='page-title'>Coating Substrate Designer</div>
      
      <cd-card-with-toolbar title='General Information'>
        <cd-card-button slot='toolbar' label='Save' on-click='_saveChanges'></cd-card-button>
        <cd-card-info-section title='Product Information' icon='cd-icons:product-info'>
          <cd-text-input wide label='Product' value='{{tablet.productName}}'></cd-text-input>
          <cd-text-input label='Active Ingredient' value='{{tablet.activeName}}'></cd-text-input>
          <cd-text-input label='Formulation' value='{{tablet.formulationName}}'></cd-text-input>
          <cd-dropdown-input label='Dosage Form' selected-value='{{tablet.dosageForm}}' values=[[dosageOptions]]></cd-dropdown-input>
          <cd-dropdown-input label='Industry'></cd-dropdown-input>
        </cd-card-info-section>
        
        <cd-card-info-section title='Company Information'  icon='cd-icons:company-info'>
          <cd-text-input label='Company' value='{{tablet.companyName}}'></cd-text-input>
          <cd-text-input label='Location' value='{{tablet.companyLocation}}'></cd-text-input>
          <cd-text-input label='Contact' value='{{tablet.contactName}}'></cd-text-input>
          <cd-text-input label='Email' value='{{tablet.contactEmail}}'></cd-text-input>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Shape & Size'>
        <cd-card-button slot='toolbar' label='Save' on-click='_saveChanges'></cd-card-button>
        
        <cd-card-info-section title='Tablet Shape' icon='cd-icons:shape'>
        
        </cd-card-info-section>
        
        <cd-card-info-section title='Tablet Dimensions' icon='cd-icons:ruler'>
          <cd-length-input label='Length' value='{{tablet.length}}' unit='{{dimensionUnits}}'></cd-length-input>
          <cd-length-input label='Width' value='{{tablet.width}}' unit='{{dimensionUnits}}'></cd-length-input>
          <cd-length-input label='Total Thickness' value='{{tablet.totalThickness}}' unit='{{dimensionUnits}}'></cd-length-input>
          <cd-length-input label='Band Thickness' value='{{tablet.bandThickness}}' unit='{{dimensionUnits}}'></cd-length-input>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Weight & Density'>
        <cd-card-button slot='toolbar' label='Save' on-click='_saveChanges'></cd-card-button>
        
        <cd-card-info-section title='Tablet Weight' icon='cd-icons:weight'>
          <cd-mass-input label='Length' value='{{tablet.weight}}' unit='mg'></cd-mass-input>
        </cd-card-info-section>
        
        <cd-card-info-section title='Bulk Density' icon='cd-icons:density'>
          <cd-density-input label='Length' value='{{tablet.bulkDensity}}' unit='g/ml'></cd-density-input>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Review & Save'>
        <cd-card-button slot='toolbar' label='Save'></cd-card-button>
        
        <cd-card-info-section title='Tablet Schematic' icon='cd-icons:tablet'>
          <cd-tablet-layout wide tablet='[[tablet]]'></cd-tablet-layout>
        </cd-card-info-section>
        
        <cd-card-info-section title='Save' icon='cd-icons:save'>
          <cd-card-button label='Save' on-click='_saveChanges'></cd-card-button>
        </cd-card-info-section>
      </cd-card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-design-page', CdTabletDesignPage);