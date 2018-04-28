
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../cd-header/cd-page-header.js';
import '../cd-header/cd-page-title.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-button.js';

import { ReduxMixin } from '../redux/redux-mixin.js';

class CdHomePage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: {type: Object, statePath: 'tablet'},
      pan: {type: Object, statePath: 'pan'},
      parameters: {type: Object, statePath: "parameters"},
      coatingAmount: {type: Object, statePath: "coatingAmount"},
      coating: {type: Object, statePath: "coating"},
      batch: {type: Object, statePath: 'batch'}
    };
  }

  _displayAsPercent(value) {
    let percent = (value * 100).toFixed(1);
    return `${percent}%`;
  }
  _displayAsKilo(value) {
    let kg = (value / 1000).toFixed(1);
    return `${kg} kg`;
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        
        app-header {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        app-header app-toolbar {
          background-color: var(--app-dark-color);
        }
        app-header #toolbar-title {
          font-size: 24px;
        }
        app-header #toolbar-spacer {
          flex-grow: 1;
        }
        app-header #user-name {
          font-size: 16px;
        }
        app-header .icon {
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--white-color);
          background-color: var(--app-light-color);
        }
        
        #materials-section {
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 72px, #000000 72px,var(--background-color) 0%,var(--background-color) 100%);
        }
        #materials-section .material-layout {
          display: grid;
          grid-template-rows: auto auto;
          grid-template-columns: 1fr auto;
          min-height: 96px;
        }
        #materials-section .material-layout:first-of-type {
          margin-top: 24px;
        }
        #materials-section .material-layout + .material-layout {
          border-top: var(--border-line);
        }
        #materials-section .material-layout .material-label {
          font-size: 18px;
          align-self: end;
        }
        #materials-section .material-layout .material-title {
          font-size: 24px;
          color: var(--app-primary-color);
          align-self: start;
        }
        #materials-section .material-layout cd-card-button,
        #materials-section .material-layout a {
          grid-row: 1 / 3;
          grid-column: 2 / 3;
          align-self: center;
        }
        
        #parameters-section {
          
        }
        #parameters-section #parameters-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 1fr;
          padding-top: 16px;
        }
        #parameters-section .parameter {
          display: flex;
          align-items: center;
          height: 48px;
          max-width: 300px;
          padding: 0px 24px;
          font-size: 16px;
        }
        #parameters-section .parameter-dot {
          width: 12px;
          height: 12px;
          margin: 0px 12px;
          border-radius: 50%;
          background-color: var(--app-primary-color);
        }
        #parameters-section .parameter-label {
          flex-grow: 1;
        }
        
      </style>
      
      <app-header-layout fullbleed>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <div class='icon'></div>
            <cd-page-title>Coating Designer</cd-page-title>
            <div class='icon'></div>
            <div id='user-name'>jhansell@colorcon.com</div>
          </app-toolbar>
        </app-header>
      
        <cd-page-header>
          <div slot='title'>Let's design your coating process.</div>
          <p slot='description'>
            Use the Colorcon Coating Designer to get recommendations on coating conditions and process
            parameters. Or audit your coating process with key coating metrics.
          </p>
        </cd-page-header>
        
        <section id='materials-section'>
      
          <cd-card-with-toolbar title='Materials & Equipment'>
            <p slot='card-description'>
              To get started choose a tablet, coating pan and coating formula
              from the library or design your own.
            </p>
            
            <div class='material-layout'>
              <div class='material-label'>Coating Substrate</div>
              <div class='material-title'>[[tablet.productName]]</div>
              <a href='#/tablet/overview'>
                <cd-card-button label='Details'></cd-card-button>
              </a>
            </div>
            
            <div class='material-layout'>
              <div class='material-label'>Coating Pan</div>
              <div class='material-title'>[[pan.manufacturer]] [[pan.model]]</div>
              <a href='#/pan/overview'>
                <cd-card-button label='Details'></cd-card-button>
              </a>
            </div>
            
            <div class='material-layout'>
              <div class='material-label'>Coating Formula</div>
              <div class='material-title'>[[coating.productName]]</div>
              <a href='#/coating/overview'>
                <cd-card-button label='Details'></cd-card-button>
              </a>
            </div>
          </cd-card-with-toolbar>
        </section>
        
        <section id='parameters-section'>
      
          <cd-card-with-toolbar title='Coating Conditions & Process Parameters'>
            <cd-card-button slot='toolbar' label='Details'></cd-card-button>
            <p slot='card-description'>
              Get recommended coating conditions and process parameters and set
              your target values.
            </p>
            <div id='parameters-layout'>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Dispersion Solids</div>
                <div class='parameter-value'>[[coating.formatted.solids]]</div>
             </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Pan Speed</div>
                <div class='parameter-value'>[[parameters.formatted.panSpeed]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Weight Gain</div>
                <div class='parameter-value'>[[coatingAmount.formatted.weightGain]]</div>
             </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Product Temperature</div>
                <div class='parameter-value'>[[parameters.formatted.productTemp]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Batch Size</div>
                <div class='parameter-value'>[[batch.formatted.batchWeight]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Spray Rate</div>
                <div class='parameter-value'>[[parameters.formatted.sprayRate]]</div>
             </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Airflow</div>
                <div class='parameter-value'>[[parameters.formatted.airflow]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>+6 More Parameters</div>
                <div class='parameter-value'></div>
             </div>
            </div>
          </cd-card-with-toolbar>
        </section>
        
      </app-header-layout>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-home-page', CdHomePage);