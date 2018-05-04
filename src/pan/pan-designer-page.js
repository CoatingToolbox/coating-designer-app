
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import { Pan } from '../redux/pan.js';
import '../header/page-header.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../card/card-button.js';
import '../inputs/text-input.js';
import '../inputs/length-input.js';
import '../inputs/dropdown-input.js';
import '../app-icons.js';
import "./pan-layout.js";

class PanDesignerPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      pan: {type: Object,  computed: '_computePan(_pan)'},
      _pan: { type: Object, statePath: 'pan'},
      isAdmin: { type: Boolean, statePath: 'app.isAdmin'},
      lengthUnits: { type: String, value: 'in'},
      perforationOptions: { type: Array, value: function() {
        return ["", "Fully", "Partially", "Solid", "Other"];
        }
      },
      airflowOptions: { type: Array, value: function() {
        return ["", "Upper Right with Plenum", "Upper Right No Plenum", "Integrated Plenum", "Other"];
        }
      },
      baffleOptions: { type: Array, value: function() {
        return ["", "Ploughshare", "Rabbit", "Helical", "Sharkfin", "Other"];
        }
      },
      gunOptions: { type: Array, value: function() {
        return ["", "Spraying System", "Schlick", "Freund", "Other"];
        }
      }
    };
  }
  
  _computePan(pan) {
    // we create a copy to prevent data binding and direct changes to the redux state
    return Object.assign({}, pan);
  }
  _save() {
    this.dispatch({
      type: "SET_PAN", 
      value: this.pan
    });
    window.location = '#/pan/overview';
  }
  
  _cancel() {
    this.dispatch({
      type: "RESET_PAN"
    });
    window.location = '#/pan/overview';
  }
  
  _saveToFirebase() {
    if(!this.isAdmin) { return; }
    let pan = new Pan(this.pan).toJSON();
    /*global firebase */
    pan.firebaseKey = firebase.database().ref('pans/').push().key;
    firebase.database().ref(`pans/${pan.firebaseKey}`).set(pan);
    window.location = '#/pan/library';
  }
  _replaceOnFirebase() {
    if(!this.isAdmin) { return; }
    let pan = new Pan(this.pan).toJSON();
    if(pan.firebaseKey) {
      /*global firebase */
      firebase.database().ref(`pans/${pan.firebaseKey}`).set(pan);
    } else {
      console.log('could not replace firebase so loaded as new');
      this._saveToFirebase();
    }
    window.location = '#/pan/library';
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
        card-with-toolbar p {
          max-width: 600px;
        }
        .button-layout {
          display: flex;
          justify-content: flex-start;
        }
        card-button + card-button {
          margin-left: 48px;
        }
        #save-button {
          background-color: var(--app-accent-color);
          border-color: var(--app-accent-color);
          color: var(--white-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <page-header>
        <div slot='title'>Coating Pan Designer</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      </page-header>
      
        <card-with-toolbar title='General Information'>
            <p slot='card-description'>
              Provide the make, model and customer where the pan is installed.
            </p>
            
            <card-info-section title='Product Information' icon='app-icons:product-info'>
              
              
              <text-input 
                wide
                label='Name' 
                value='{{pan.nickname}}'>
              </text-input>
              
              <text-input 
                label='Manufacturer' 
                value='{{pan.manufacturerName}}'>
              </text-input>
              
              <text-input 
                label='Model' 
                value='{{pan.modelName}}'>
              </text-input>
            
            </card-info-section>
            
            <card-info-section title='Company Information'  icon='app-icons:company-info'>
             
              <text-input 
                label='Company' 
                value='{{pan.companyName}}'>
              </text-input>
              
              <text-input 
                label='Location' 
                value='{{pan.companyLocation}}'>
              </text-input>
              
              <text-input 
                label='Contact' 
                value='{{pan.contactName}}'>
              </text-input>
              
              <text-input 
                label='Email' 
                value='{{pan.contactEmail}}'>
              </text-input>
           
           </card-info-section>
           
          </card-with-toolbar>
        
        
        <card-with-toolbar title='Coating Pan Size'>
          <p slot='card-description'>
            Provide dimensions of the pan to calculate the volume.
          </p>
          
          <card-info-section title='Dimensions' icon='app-icons:ruler'>
            
            <length-input 
              label='Drum Diameter' 
              value='{{pan.panDiameter}}'
              unit='{{lengthUnits}}'>
            </length-input>
            
            <length-input 
              label='Opening Diameter' 
              value='{{pan.openingDiameter}}'
              unit='{{lengthUnits}}'>
            </length-input>
            
            <length-input 
              label='Depth at Brim' 
              value='{{pan.brimWidth}}'
              unit='{{lengthUnits}}'>
            </length-input>
            
            <length-input 
              label='Perforated Wall Width' 
              value='{{pan.wallWidth}}'
              unit='{{lengthUnits}}'>
            </length-input>
          
          </card-info-section>
          
          <card-info-section title='Coating Pan Schematic'  icon='app-icons:product-info'>
           
            <pan-layout wide pan='[[pan]]'></pan-layout>
         
         </card-info-section>
         
        </card-with-toolbar>        
        
        <card-with-toolbar title='Coating Pan Setup'>
          <p slot='card-description'>
            Provide dimensions of the pan to calculate the volume.
          </p>
          
          <card-info-section title='Airflow' icon='app-icons:airhandler'>
            
            <dropdown-input 
              label='Perforation Type' 
              selected='{{pan.perforationType}}'
              options='[[perforationOptions]]'>
            </dropdown-input>
            
            <dropdown-input 
              label='Airflow Type' 
              selected='{{pan.airflowType}}'
              options='[[airflowOptions]]'>
            </dropdown-input>
            
            <unit-input 
              label='Max Airflow' 
              value='{{pan.maxAirflow}}'
              unit='cfm'>
            </unit-input>
              
          
          </card-info-section>
          
          <card-info-section title='Baffles' icon='app-icons:mix'>
            
            <dropdown-input 
              label='Baffle Type' 
              selected='{{pan.baffleType}}'
              options='[[baffleOptions]]'>
            </dropdown-input>
            
            <unit-input 
              label='# of Baffles' 
              value='{{pan.baffleCount}}'
              unit=''>
            </unit-input>
            
            <length-input 
              label='Baffle Height' 
              value='{{pan.baffleHeight}}'
              unit='{{lengthUnits}}'>
            </length-input>
              
          
          </card-info-section>
          
          <card-info-section title='Spray Guns' icon='app-icons:mix'>
            
            <dropdown-input 
              label='Manufacturer' 
              selected='{{pan.gunMake}}'
              options='[[gunOptions]]'>
            </dropdown-input>
            
            <text-input 
              label='Model' 
              value='{{pan.gunModel}}'>
            </text-input>
            
            <unit-input 
              label='# of Spray Guns' 
              value='{{pan.gunCount}}'
              unit=''>
            </unit-input>
            
            <length-input 
              label='Gun To Gun Distance' 
              value='{{pan.gunToGunDistance}}'
              unit='{{lengthUnits}}'>
            </length-input>
          
          </card-info-section>
         
        </card-with-toolbar>
      
      <card-with-toolbar title='Calculate Coating Pan'>
          
        <card-info-section title='Save Changes' icon='app-icons:save'>
        
          <p wide>
            Using the provided information the coating pan volume is calculated. Other information
            is used to provide process recommendations.
          </p>
          
          <div class='button-layout' wide>
            <card-button id='save-button' label='Calculate Pan' on-click='_save'></card-button>
            <card-button label='Cancel Changes' on-click='_cancel'></card-button>
          </div>
        </card-info-section>
        
        <card-info-section hidden$='[[!isAdmin]]' title='Firebase' icon='app-icons:save'>
          <p wide>
            Update current tablet or add new items to the tablet library saved on firebase.
          </p>
          <div class='button-layout' wide>
            <card-button label='Save to Firebase' on-click='_saveToFirebase'></card-button>
            <card-button label='Update on Firebase' on-click='_replaceOnFirebase'></card-button>
          </div>
        </card-info-section>
        
          
      </card-with-toolbar>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-designer-page', PanDesignerPage);