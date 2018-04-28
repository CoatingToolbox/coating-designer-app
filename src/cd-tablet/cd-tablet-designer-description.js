
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-info-section.js';
import '../cd-inputs/cd-text-input.js';
import '../cd-inputs/cd-dropdown-input.js';

class CdTabletDesignerDescription extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
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
        }
      </style>
        
        <cd-card-with-toolbar title='General Information'>
          
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
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-designer-description', CdTabletDesignerDescription);