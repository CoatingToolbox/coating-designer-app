
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../header/page-header.js';
import '../app-icons.js';

class PanDesignerPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: {type: Object,  computed: '_computeTablet(_tablet)'},
      _tablet: { Object, statePath: 'tablet'},
      route: Object,
      routeData: Object
    };
  }
  
  _computeTablet(tablet) {
    // we create a copy to prevent data binding and direct changes to the redux state
    return Object.assign({}, tablet);
  }
  
  static get observers() {
    return [
      '_scrollPageToTop(routeData.section)'
    ];
  }
  
  _scrollPageToTop() {
    window.scrollTo(0, 0);
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        iron-pages {
          margin-top: 48px;
        }
      </style>
      
      <app-location
        route="{{route}}"
        use-hash-as-path>
      </app-location>
  
      <app-route
        route="{{route}}"
        pattern="/pan/designer/:section"
        data="{{routeData}}">
      </app-route>
      
      <page-header>
        <div slot='title'>Coating Pan Designer</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      </page-header>
      
      <tablet-designer-stepper></tablet-designer-stepper>
      
      <iron-pages selected='[[routeData.section]]' attr-for-selected='section' fallback-selection='description'>
        <pan-designer-description section='description' tablet='{{tablet}}'></pan-designer-description>
        <pan-designer-shape section='shape' shape='{{tablet.shape}}'></pan-designer-shape>
        <pan-designer-dimensions section='dimensions' tablet='{{tablet}}'></pan-designer-dimensions>
        <pan-designer-weight section='weight' tablet='{{tablet}}'></pan-designer-weight>
        <pan-designer-calculate section='calculate' tablet='[[tablet]]'></pan-designer-calculate>
      </iron-pages>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-designer-page', PanDesignerPage);