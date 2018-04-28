
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../card/card-button.js';
import '../inputs/text-input.js';
import '../inputs/dropdown-input.js';

class TabletDesignerDescription extends ReduxMixin(PolymerElement) {
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
      </style>
        
        <card-with-toolbar title='General Information'>
          <p slot='card-description'>
            Provide a description of the product and customer.
          </p>
          
          <card-info-section title='Product Information' icon='app-icons:product-info'>
            
            <text-input 
              wide 
              label='Product' 
              value='{{tablet.productName}}' 
              data-redux='SET_TABLET_PRODUCT_NAME' 
              on-value-changed='_saveValue'>
            </text-input>
            
            <text-input 
              label='Active Ingredient' 
              value='{{tablet.activeName}}'
              data-redux='SET_TABLET_ACTIVE_NAME' 
              on-value-changed='_saveValue'>
            </text-input>
            
            <text-input 
              label='Formulation' 
              value='{{tablet.formulationName}}'
              data-redux='SET_TABLET_FORMULATION_NAME' 
              on-value-changed='_saveValue'>
            </text-input>
          
            <dropdown-input 
              label='Dosage Form' 
              selected='{{tablet.dosageForm}}' 
              options='[[dosageOptions]]'
              data-redux='SET_TABLET_DOSAGE_FORM' 
              on-selected-changed='_saveValue'>
            </dropdown-input>
            
            <dropdown-input 
              label='Market' 
              selected='{{tablet.productType}}' 
              options='[[marketOptions]]'
              data-redux='SET_TABLET_PRODUCT_TYPE' 
              on-selected-changed='_saveValue'>
            </dropdown-input>
          
          </card-info-section>
          
          <card-info-section title='Company Information'  icon='app-icons:company-info'>
           
            <text-input 
              label='Company' 
              value='{{tablet.companyName}}'
              data-redux='SET_TABLET_COMPANY_NAME' 
              on-value-changed='_saveValue'>
            </text-input>
            
            <text-input 
              label='Location' 
              value='{{tablet.companyLocation}}'
              data-redux='SET_TABLET_COMPANY_LOCATION' 
              on-value-changed='_saveValue'>
            </text-input>
            
            <text-input 
              label='Contact' 
              value='{{tablet.contactName}}'
              data-redux='SET_TABLET_CONTACT_NAME' 
              on-value-changed='_saveValue'>
            </text-input>
            
            <text-input 
              label='Email' 
              value='{{tablet.contactEmail}}'
              data-redux='SET_TABLET_CONTACT_EMAIL' 
              on-value-changed='_saveValue'>
            </text-input>
         
         </card-info-section>
         
        </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-description', TabletDesignerDescription);