
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../card/card-button.js';
import '../inputs/text-input.js';
import '../inputs/dropdown-input.js';

class TabletDesignerDescription extends PolymerElement {
  static get properties () {
    return {
      tablet: { type: Object, notify: true },
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
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          background: linear-gradient(to bottom, var(--background-color) 0%,var(--background-color) 124px, #000000 124px,var(--white-color) 0%,var(--white-color) 100%);
        
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
              value='{{tablet.productName}}'>
            </text-input>
            
            <text-input 
              label='Active Ingredient' 
              value='{{tablet.activeName}}'>
            </text-input>
            
            <text-input 
              label='Formulation' 
              value='{{tablet.formulationName}}'>
            </text-input>
          
            <dropdown-input 
              label='Dosage Form' 
              selected='{{tablet.dosageForm}}' 
              options='[[dosageOptions]]'>
            </dropdown-input>
            
            <dropdown-input 
              label='Market' 
              selected='{{tablet.productType}}' 
              options='[[marketOptions]]'>
            </dropdown-input>
          
          </card-info-section>
          
          <card-info-section title='Company Information'  icon='app-icons:company-info'>
           
            <text-input 
              label='Company' 
              value='{{tablet.companyName}}'>
            </text-input>
            
            <text-input 
              label='Location' 
              value='{{tablet.companyLocation}}'>
            </text-input>
            
            <text-input 
              label='Contact' 
              value='{{tablet.contactName}}'>
            </text-input>
            
            <text-input 
              label='Email' 
              value='{{tablet.contactEmail}}'>
            </text-input>
         
         </card-info-section>
         
        </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-description', TabletDesignerDescription);