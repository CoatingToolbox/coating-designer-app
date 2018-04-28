
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../cd-header/cd-page-header.js';
import './cd-tablet-designer-stepper.js';
import './cd-tablet-designer-description.js';
import './cd-tablet-designer-dimensions.js';
import './cd-tablet-designer-weight.js';
import './cd-tablet-designer-review.js';
import '../cd-icons.js';

class CdTabletDesignerPage extends PolymerElement {
  static get properties () {
    return {
      route: Object,
      routeData: Object
    };
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 55vh, #000000 55vh, var(--background-color) 0%,var(--background-color) 100%);
        }
        cd-page-header {
          padding: 72px 0px 24px 0px;
        
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
      
      <cd-page-header>
        <div slot='title'>Tablet Core Designer</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      
        <cd-tablet-designer-stepper></cd-tablet-designer-stepper>
      </cd-page-header>
      
      <iron-pages selected='[[routeData.section]]' attr-for-selected='section' fallback-selection='description'>
        <cd-tablet-designer-description section='description'></cd-tablet-designer-description>
        <cd-tablet-designer-dimensions section='dimensions'></cd-tablet-designer-dimensions>
        <cd-tablet-designer-weight section='weight'></cd-tablet-designer-weight>
        <cd-tablet-designer-review section='review'></cd-tablet-designer-review>
      </iron-pages>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-designer-page', CdTabletDesignerPage);