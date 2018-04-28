
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../app-icons.js';
import './tablet-layout.js';

class CdTabletDesignerShape extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
    };
  }
  
  _saveValue(e) {
    this.dispatch({
      type: "SET_TABLET_SHAPE",
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
        #shape-selector {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin: 48px auto;
          
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
          --iron-icon-width: 124px;
          --iron-icon-height: 124px;
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
      </style>
      
        
        <card-with-toolbar title='Tablet Shape'>
          <p slot='card-description'>
            Select the shape that best describes the tablet.
          </p>
          <iron-selector on-selected-changed='_saveValue' id='shape-selector' wide selected='{{tablet.shape}}' attr-for-selected='shape'>
         
          <div shape='round'>
            <iron-icon icon='app-icons:round-tablet'></iron-icon>
            <div>Round</div>
          </div>
          
          <div shape='oval'>
            <iron-icon icon='app-icons:oval-tablet'></iron-icon>
            <div>Oval</div>
          </div>
          
          <div shape='caplet'>
            <iron-icon icon='app-icons:caplet-tablet'></iron-icon>
            <div>Caplet</div>
          </div>
          
          </iron-selector>
        </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-shape', CdTabletDesignerShape);