
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import { Tablet } from '../redux/tablet.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../app-icons.js';

class TabletDesignerCalculate extends ReduxMixin(PolymerElement) {
  
  static get properties() {
    return {
      tablet: Object,
      isAdmin: { type: Boolean, statePath: 'app.isAdmin'}
    };
  }
  _saveTablet() {
    this.dispatch({
      type: "SET_TABLET", 
      value: this.tablet
    });
    window.location = '#/tablet/overview';
  }
  
  _cancelTablet() {
    this.dispatch({
      type: "RESET_TABLET"
    });
    window.location = '#/tablet/overview';
  }
  
  _saveToFirebase() {
    if(!this.isAdmin) { return; }
    let tab = new Tablet(this.tablet).toJSON();
    /*global firebase */
    tab.firebaseKey = firebase.database().ref('tablets/').push().key;
    firebase.database().ref(`tablets/${tab.firebaseKey}`).set(tab);
  }
  _replaceOnFirebase() {
    if(!this.isAdmin) { return; }
    let tab = new Tablet(this.tablet).toJSON();
    if(tab.firebaseKey) {
      /*global firebase */
      firebase.database().ref(`tablets/${tab.firebaseKey}`).set(tab);
    } else {
      console.log('could not replace firebase so loaded as new');
      this._saveToFirebase();
    }
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
        .gray-button {
          background-color: var(--text-light-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <card-with-toolbar title='Calculate Tablet Properties'>
          
        <card-info-section title='Save Changes' icon='app-icons:save'>
        
          <p wide>
            With the provided information other tablet properties will be calculated. This includes
            properties useful for coating such as tablet surface area and batch volume.
          </p>
          
          <div class='button-layout' wide>
            <card-button label='Calculate Tablet' on-click='_saveTablet'></card-button>
            <card-button class='gray-button' label='Cancel Changes' on-click='_cancelTablet'></card-button>
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
customElements.define('tablet-designer-calculate', TabletDesignerCalculate);