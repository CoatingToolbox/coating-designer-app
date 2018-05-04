
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-button.js';
import '../card/card-info-section.js';
import '../card/card-info-item.js';
import '../header/page-header.js';
import '../header/page-header-button.js';

class CoatingOverviewPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      coating: { type: Object, statePath: 'coating' }
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
        card-with-toolbar a + a {
          margin-left: 16px;
        }
        pan-layout {
          margin: 32px auto 24px;
        }
        .capitalize {
          text-transform: capitalize;
        }
        [hidden] {
          display: none !important;
        }
      </style>
      
      
      <page-header>
        <div slot='title'>Coating Formulation Overview</div>
        <p slot='description'>
          Review the current selected tablet and make changes with the tablet designer
          or load a tablet from the library.
        </p>
      </page-header>
      
      
        <card-with-toolbar title='General Information'>
          <a href='#/pan/designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
          <a href='#/pan/library' slot='toolbar'>
           <card-button label='library'></card-button>
          </a>
          <card-info-section title='Product Details' icon='app-icons:product-info'>
            <card-info-item wide label='Name' capitalize>[[coating.productName]]</card-info-item>
            <card-info-item wide label='Formula' capitalize>[[coating.formulaName]]</card-info-item>
            <card-info-item wide label='Color' capitalize>[[coating.color]]</card-info-item>
          </card-info-section>
          <card-info-section title='Recommendations' icon='app-icons:airhandler'>
            <card-info-item wide label='Dispersion Solids' capitalize>[[coating.formatted.recommendedSolids]]</card-info-item>
            <card-info-item wide label='Product Temperature' capitalize>[[coating.formatted.recommendProductTemp]]</card-info-item>
            <card-info-item wide label='Coating Amout'>[[coating.formatted.recommendedWG]] cfm</card-info-item>
          </card-info-section>
        </card-with-toolbar>
      
      
      <card-with-toolbar title='Coating Properties'>
          <a href='#/pan/designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
          <a href='#/pan/library' slot='toolbar'>
           <card-button label='library'></card-button>
          </a>
        
        <card-info-section title='Film Properties' icon='app-icons:ruler'>
          <card-info-item wide label='Film Density'>[[coating.formatted.filmDensity]]</card-info-item>
          <card-info-item wide label='Opacity'>[[coating.formatted.filmOpacity]]</card-info-item>
        </card-info-section>
        <card-info-section title='Viscosity Profile' icon='app-icons:ruler'>
          <coating-viscosity-graph viscosity='[[coating.data.viscosity]]'></coating-viscosity-graph>
        </card-info-section>
      </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coating-overview-page', CoatingOverviewPage);