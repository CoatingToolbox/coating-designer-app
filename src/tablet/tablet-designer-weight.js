
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../card/card-with-toolbar.js';
import '../card/card-info-section.js';
import '../inputs/mass-input.js';
import '../inputs/density-input.js';

class TabletDesignerWeight extends PolymerElement {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' },
    };
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
      </style>
      
        <card-with-toolbar title='Tablet Weight & Density'>
          <p slot='card-description'>
            Provide additional details on the tablet weight.
          </p>
        
          <card-info-section title='Tablet Weight' icon='app-icons:weight'>
            <mass-input 
              label='Tablet Weight' 
              value='{{tablet.weight}}' 
              unit='mg'>
            </mass-input>
          </card-info-section>
          
          <card-info-section title='Bulk Density' icon='app-icons:density'>
            <density-input
              label='Bulk Density' 
              value='{{tablet.bulkDensity}}' 
              unit='g/ml'>
            </density-input>
          </card-info-section>
          
        </card-with-toolbar>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-weight', TabletDesignerWeight);