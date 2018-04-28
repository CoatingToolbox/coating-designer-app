
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../header/page-header.js';
import './tablet-designer-stepper.js';
import './tablet-designer-description.js';
import './tablet-designer-shape.js';
import './tablet-designer-dimensions.js';
import './tablet-designer-weight.js';
import './tablet-designer-density.js';
import '../app-icons.js';

class TabletDesignerPage extends PolymerElement {
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
        page-header {
          padding: 72px 0px 0px 0px;
        }
        tablet-designer-stepper {
          margin-top: 24px;
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
      
      <page-header>
        <div slot='title'>Tablet Core Designer</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      
        <tablet-designer-stepper></tablet-designer-stepper>
      </page-header>
      
      <iron-pages selected='[[routeData.section]]' attr-for-selected='section' fallback-selection='description'>
        <tablet-designer-description section='description'></tablet-designer-description>
        <tablet-designer-shape section='shape'></tablet-designer-shape>
        <tablet-designer-dimensions section='dimensions'></tablet-designer-dimensions>
        <tablet-designer-weight section='weight'></tablet-designer-weight>
        <tablet-designer-density section='density'></tablet-designer-density>
      </iron-pages>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-designer-page', TabletDesignerPage);