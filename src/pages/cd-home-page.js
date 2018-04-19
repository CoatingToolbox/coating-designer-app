
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../cd-elements/cd-card-with-toolbar.js';
import '../cd-elements/cd-card-button.js';

class CdHomePage extends PolymerElement {
  static get properties () {
    return {
      
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          min-height: 100vh;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 360px, #000000 360px,var(--background-color) 0%,var(--background-color) 100%);
          padding-bottom: 48px;
        }
        
        #header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--white-color);
          padding: 96px 0px 48px 0px;
        }
        #header h1 {
          font-size: 48px;
          font-weight: bold;
          margin: 0px;
        }
        #header p {
          max-width: 600px;
          text-align: center;
          margin: 0px;
        }
        
        cd-card-with-toolbar {
          margin-bottom: 24px;
        }
        
        .material-layout {
          display: grid;
          grid-template-rows: auto auto;
          grid-template-columns: 1fr auto;
          min-height: 96px;
        }
        .material-layout:first-of-type {
          margin-top: 24px;
        }
        .material-layout + .material-layout {
          border-top: 1px solid var(--border-color);
        }
        .material-layout .material-label {
          font-size: 18px;
          align-self: end;
        }
        .material-layout .material-title {
          font-size: 24px;
          color: var(--app-primary-color);
          align-self: start;
        }
        .material-layout cd-card-button,
        .material-layout a {
          grid-row: 1 / 3;
          grid-column: 2 / 3;
          align-self: center;
        }
        
        #parameters-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 1fr;
          padding-top: 16px;
        }
        .parameter {
          display: flex;
          align-items: center;
          height: 48px;
          max-width: 300px;
          padding: 0px 24px;
          font-size: 16px;
        }
        .parameter-dot {
          width: 12px;
          height: 12px;
          margin: 0px 12px;
          border-radius: 50%;
          background-color: var(--app-primary-color);
        }
        .parameter-label {
          flex-grow: 1;
        }
      </style>
      
      <section id='header'>
        <h1>Let's design your coating process.</h1>
        <p>
          Use the Colorcon Coating Designer to get recommendations on coating conditions and process
          parameters. Or audit your coating process with key coating metrics.
        </p>
      </section>
      
      <cd-card-with-toolbar title='Materials & Equipment'>
        <p slot='card-description'>
          To get started choose a tablet, coating pan and coating formula
          from the library or design your own.
        </p>
        
        <div class='material-layout'>
          <div class='material-label'>Coating Substrate</div>
          <div class='material-title'>Colorcon Round Placebo</div>
          <a href='#/tablet/overview'>
            <cd-card-button label='Edit'></cd-card-button>
          </a>
        </div>
        
        <div class='material-layout'>
          <div class='material-label'>Coating Pan</div>
          <div class='material-title'>O'Hara Fastcoat 48"</div>
          <cd-card-button label='Edit'></cd-card-button>
        </div>
        
        <div class='material-layout'>
          <div class='material-label'>Coating Formula</div>
          <div class='material-title'>Opadry II 85F Pigmented</div>
          <cd-card-button label='Edit'></cd-card-button>
        </div>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Coating Conditions & Process Parameters'>
        <cd-card-button slot='toolbar' label='Edit'></cd-card-button>
        <p slot='card-description'>
          Get recommended coating conditions and process parameters and set
          your target values.
        </p>
        <div id='parameters-layout'>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Dispersion Solids</div>
            <div class='parameter-value'>20%</div>
         </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Pan Speed</div>
            <div class='parameter-value'>8 rpm</div>
          </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Weight Gain</div>
            <div class='parameter-value'>3.2%</div>
         </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Product Temperature</div>
            <div class='parameter-value'>46&degC</div>
          </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Batch Size</div>
            <div class='parameter-value'>140.3 kg</div>
          </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Spray Rate</div>
            <div class='parameter-value'>365 g/min</div>
         </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>Airflow</div>
            <div class='parameter-value'>1800 cfm</div>
          </div>
          <div class='parameter'>
            <div class='parameter-dot'></div>
            <div class='parameter-label'>+6 More Parameters</div>
            <div class='parameter-value'></div>
         </div>
        </div>
      </cd-card-with-toolbar>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-home-page', CdHomePage);