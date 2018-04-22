
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../cd-elements/cd-card-with-toolbar.js';
import '../cd-elements/cd-card-button.js';
import '../cd-elements/cd-card-info-section.js';
import '../cd-elements/cd-tablet-layout.js';
import '../cd-elements/cd-text-input.js';
import '../cd-elements/cd-list-input.js';
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
      }
    };
  }
  
  _saveChanges() {
    this.dispatch({
      type: "LOAD_TABLET_FROM_LIBRARY",
      value: this.tablet
    });
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
        <cd-card-info-section title='Product Information' icon=''>
          <cd-text-input wide label='Product' value='{{tablet.productName}}'></cd-text-input>
          <cd-text-input label='Active Ingredient' value='{{tablet.activeName}}'></cd-text-input>
          <cd-text-input label='Formulation' value='{{tablet.formulationName}}'></cd-text-input>
          <cd-list-input label='Dosage Form' selected-value='{{tablet.dosageForm}}' values=[[dosageOptions]]></cd-list-input>
          <cd-list-input label='Industry'></cd-list-input>
        </cd-card-info-section>
        
        <cd-card-info-section title='Company Information' icon=''>
          <cd-text-input label='Company' value='{{tablet.companyName}}'></cd-text-input>
          <cd-text-input label='Location' value='{{tablet.companyLocation}}'></cd-text-input>
          <cd-text-input label='Contact' value='{{tablet.contactName}}'></cd-text-input>
          <cd-text-input label='Email' value='{{tablet.contactEmail}}'></cd-text-input>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Shape & Size'>
        <cd-card-button slot='toolbar' label='Save'></cd-card-button>
        
        <cd-card-info-section title='Tablet Shape' icon=''>
        </cd-card-info-section>
        
        <cd-card-info-section title='Tablet Dimensions' icon=''>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Weight & Density'>
        <cd-card-button slot='toolbar' label='Save'></cd-card-button>
        
        <cd-card-info-section title='Tablet Weight' icon=''>
        </cd-card-info-section>
        
        <cd-card-info-section title='Bulk Density' icon=''>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Review & Save'>
        <cd-card-button slot='toolbar' label='Save'></cd-card-button>
        
        <cd-card-info-section title='Tablet Schematic' icon=''>
          <cd-tablet-layout wide tablet='[[tablet]]'></cd-tablet-layout>
        </cd-card-info-section>
        
        <cd-card-info-section title='Save' icon=''>
        </cd-card-info-section>
      </cd-card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-design-page', CdTabletDesignPage);