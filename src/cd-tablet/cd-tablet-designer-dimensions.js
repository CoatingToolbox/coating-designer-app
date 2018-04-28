
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-info-section.js';
import '../cd-inputs/cd-length-input.js';
import '../cd-icons.js';
import './cd-tablet-layout.js';

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
        cd-card-info-section + cd-card-info-section {
          border-top: var(--border-line);
        }
        [hidden] {
          visibility: hidden !important;
        }
      </style>
      
        
        <cd-card-with-toolbar title='Shape & Size'>
          
          <cd-card-info-section title='Shape' icon='cd-icons:shape'>
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
          
          <cd-card-info-section title='Dimensions' icon='cd-icons:ruler'>
            
            <cd-length-input label='Length' value='{{tablet.length}}' unit='{{dimensionUnits}}'></cd-length-input>
            <cd-length-input hidden$='{{isRound}}' label='Width' value='{{tablet.width}}' unit='{{dimensionUnits}}'></cd-length-input>
            <cd-length-input label='Total Thickness' value='{{tablet.totalThickness}}' unit='{{dimensionUnits}}'></cd-length-input>
            <cd-length-input label='Band Thickness' value='{{tablet.bandThickness}}' unit='{{dimensionUnits}}'></cd-length-input>
          
          </cd-card-info-section>
          
        </cd-card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-designer-dimensions', CdTabletDesignerDimensions);