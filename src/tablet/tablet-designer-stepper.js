
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';

class TabletDesignerStepper extends PolymerElement {
  static get properties () {
    return {
      label: String
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        #layout {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr auto 1fr auto 1fr auto;
          grid-template-rows: auto;
          max-width: 800px;
          margin: auto;
          padding: 24px;
        }
        .item-layout {
          display: flex;
          flex-direction: row;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        .item-layout.iron-selected {
          font-weight: bold;
        }
        
        .item-icon {
          height: 18px;
          width: 18px;
          margin-right: 6px;
          background-color: var(--app-light-color);
          border-radius: 50%;
          border: 2px solid var(--white-color);
        }
        .iron-selected .item-icon {
          background-color: var(--app-accent-color);
        }
        .item-label {
          font-size: 14px;
        }
        .line-layout {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0px 16px;
        }
        .line {
          flex-grow: 1;
          max-height: 1px;
          background-color: var(--white-color);
        }
      </style>
      
      <app-location
        route="{{route}}"
        use-hash-as-path>
      </app-location>
  
      <app-route
        route="{{route}}"
        pattern="/tablet/designer/:section"
        data="{{routeData}}">
      </app-route>
      
      <iron-selector id='layout' selected='[[routeData.section]]' attr-for-selected='section'>
      
        <a section='description' class='item-layout' href='#/tablet/designer/description'>
          <div class='item-icon'></div>
          <div class='item-label'>Description</div>
        </a>
        
        <div class='line-layout'>
          <div class='line'></div>
        </div>
        
        <a section='shape' class='item-layout' href='#/tablet/designer/shape'>
          <div class='item-icon'></div>
          <div class='item-label'>Shape</div>
        </a>
        
        <div class='line-layout'>
          <div class='line'></div>
        </div>
        
        <a section='dimensions' class='item-layout' href='#/tablet/designer/dimensions'>
          <div class='item-icon'></div>
          <div class='item-label'>Dimensions</div>
        </a>
        
        <div class='line-layout'>
          <div class='line'></div>
        </div>
        
        <a section='weight' class='item-layout' href='#/tablet/designer/weight'>
          <div class='item-icon'></div>
          <div class='item-label'>Weight</div>
        </a>
        
        <div class='line-layout'>
          <div class='line'></div>
        </div>
        
        <a section='density' class='item-layout' href='#/tablet/designer/density'>
          <div class='item-icon'></div>
          <div class='item-label'>Bulk Density</div>
        </a>
        
      </iron-selector>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-stepper', TabletDesignerStepper);