
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-button.js';
import '../cd-card/cd-card-info-section.js';
import '../cd-elements/cd-tablet-layout.js';
import '../cd-inputs/cd-text-input.js';
import '../cd-inputs/cd-dropdown-input.js';
import '../cd-inputs/cd-length-input.js';
import '../cd-inputs/cd-mass-input.js';
import '../cd-inputs/cd-density-input.js';
import '../cd-icons.js';

import { ReduxMixin } from '../redux/redux-mixin.js';

class CdTabletDesignPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
      isRound: {type: Boolean, computed: '_computeIsRound(tablet.shape)'},
      dosageOptions: { 
        type: Array, 
        value: function() {
          return ["", "Tablet", "Softgel", "Hard Capsule"];
        }
      },
      marketOptions: {
        type: Array,
        value: function() {
          return ["", "Pharmaceutical", "Nutritional", "Other"];
        }
      },
      dimensionUnits: {type: String, value: 'mm'}
    };
  }
  
  _computeIsRound(shape) {
    return shape === 'round';
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
        #shape-selector {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        #shape-selector [shape] {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--background-color);
          border: 3px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-light-color);
          font-size: 14px;
          padding: 16px 24px;
        }
        #shape-selector iron-icon {
          --iron-icon-width: 96px;
          --iron-icon-height: 96px;
          --iron-icon-fill-color: var(--border-color);
          --iron-icon-stroke-color: var(--border-color);
        }
        #shape-selector .iron-selected {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        #shape-selector .iron-selected iron-icon {
          --iron-icon-fill-color: var(--app-primary-color);
          --iron-icon-stroke-color: var(--app-primary-color);
        }
        
        #review-save-button {
          grid-column: 1 / 2;
          justify-self: start;
        }
        cd-card-info-section + cd-card-info-section {
          border-top: var(--border-line);
        }
        .capitalize {
          text-transform: capitalize;
        }
        [hidden] {
          visibility: hidden !important;
        }
      </style>
      
      <div id='page-title'>Coating Substrate Designer</div>
      
      <cd-card-with-toolbar title='General Information'>
        <cd-card-button slot='toolbar' label='Save' on-click='_saveChanges'></cd-card-button>
        <cd-card-info-section title='Product Information' icon='cd-icons:product-info'>
          <cd-text-input wide label='Product' value='{{tablet.productName}}'></cd-text-input>
          <cd-text-input label='Active Ingredient' value='{{tablet.activeName}}'></cd-text-input>
          <cd-text-input label='Formulation' value='{{tablet.formulationName}}'></cd-text-input>
          <cd-dropdown-input label='Dosage Form' selected='{{tablet.dosageForm}}' options='[[dosageOptions]]'></cd-dropdown-input>
          <cd-dropdown-input label='Market' selected='{{tablet.productType}}' options='[[marketOptions]]'></cd-dropdown-input>
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
          <iron-selector id='shape-selector' wide selected='{{tablet.shape}}' attr-for-selected='shape'>
            <div shape='round'>
              <iron-icon icon='cd-icons:round-tablet'></iron-icon>
              <div>Round</div>
            </div>
            <div shape='oval'>
              <iron-icon icon='cd-icons:oval-tablet'></iron-icon>
              <div>Oval</div>
            </div>
            <div shape='caplet'>
              <iron-icon icon='cd-icons:caplet-tablet'></iron-icon>
              <div>Caplet</div>
            </div>
          </iron-selector>
        </cd-card-info-section>
        
        <cd-card-info-section title='Tablet Dimensions' icon='cd-icons:ruler'>
          <cd-length-input label='Length' value='{{tablet.length}}' unit='{{dimensionUnits}}'></cd-length-input>
          <cd-length-input hidden$='{{isRound}}' label='Width' value='{{tablet.width}}' unit='{{dimensionUnits}}'></cd-length-input>
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
        <cd-card-info-section title='Tablet Schematic' icon='cd-icons:tablet'>
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
customElements.define('cd-tablet-design-page', CdTabletDesignPage);