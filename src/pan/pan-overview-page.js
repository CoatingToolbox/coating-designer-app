
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../card/card-with-toolbar.js';
import '../card/card-button.js';
import '../card/card-info-section.js';
import '../card/card-info-item.js';
import '../header/page-header.js';
import '../header/page-header-button.js';

class PanOverviewPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      pan: { type: Object, statePath: 'pan' }
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
        #background-wrapper {
          background: linear-gradient(to bottom, var(--background-color) 0%,var(--background-color) 124px, #000000 124px,var(--white-color) 0%,var(--white-color) 100%);
        }
        card-info-section + card-info-section {
          border-top: var(--border-line);
        }
        tablet-layout {
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
        <div slot='title'>Coating Pan Overview</div>
        <p slot='description'>
          Review the current selected tablet and make changes with the tablet designer
          or load a tablet from the library.
        </p>
        <a href='#/pan/designer/description' slot='button'>
          <page-header-button label='Pan Designer'></page-header-button>
        </a>
        <a href='#/pan/library' slot='button'>
          <page-header-button label='Pan Library'></page-header-button>
        </a>
      </page-header>
      
      <div id='background-wrapper'>
        <card-with-toolbar title='General Information'>
          <a href='#/tablet/designer/description' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
          <card-info-section title='Equipment Information' icon='app-icons:product-info'>
            <card-info-item wide label='Model' class='capitalize'>[[pan.modelName]]</card-info-item>
            <card-info-item wide label='Manufacturer' class='capitalize'>[[pan.manufacturerName]]</card-info-item>
            <card-info-item wide label='Nickname' class='capitalize'>[[pan.nickname]]</card-info-item>
          </card-info-section>
          
          <card-info-section title='Company Information' icon='app-icons:company-info'>
            <card-info-item wide label='Company' class='capitalize'>[[pan.companyName]]</card-info-item>
            <card-info-item wide label='Location' class='capitalize'>[[pan.companyLocation]]</card-info-item>
            <card-info-item wide label='Contact' class='capitalize'>[[pan.contactName]]</card-info-item>
            <card-info-item wide label='Email'>[[pan.contactEmail]]</card-info-item>
          </card-info-section>
        </card-with-toolbar>
      </div>
      
      
      <card-with-toolbar title='Coating Pan Size'>
        <a href='#/tablet/designer/shape' slot='toolbar'>
         <card-button label='Edit'></card-button>
        </a>
        
        <card-info-section title='Dimensions' icon='app-icons:ruler'>
          <card-info-item wide label='Drum Diameter'>[[pan.fomratted.panDiameter]]</card-info-item>
          <card-info-item wide label='Opening Diameter'>[[pan.formatted.openingDiameter]]</card-info-item>
          <card-info-item wide label='Depth at Brim'>[[pan.formatted.brimWidth]]</card-info-item>
          <card-info-item wide label='Height to Brim'>[[pan.formatted.brimHeight]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Volume' icon='app-icons:weight'>
          <card-info-item wide label='Brim Volume'>[[pan.formatted.brimVolume]]</card-info-item>
          <card-info-item wide label='Max Working Volume'>[[pan.formatted.maxFillVolume]]</card-info-item>
          <card-info-item wide label='Min Working Volume'>[[pan.formatted.minFillVolume]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
      
      <card-with-toolbar title='Coating Pan Schematic'>
          <tablet-layout tablet='[[tablet]]'></tablet-layout>
      </card-with-toolbar>
      
      <card-with-toolbar title='Coating Pan Setup'>
        <card-info-section title='Airhandler' icon='app-icons:concavity'>
          <card-info-item wide label='Concavity' class='capitalize'>[[tablet.concavity]]</card-info-item>
          <card-info-item wide label='Cup Depth'>[[tablet.formatted.cupDepth]]</card-info-item>
          <card-info-item wide label='Length Cup Radius'>[[tablet.formatted.lengthCupRadius]]</card-info-item>
          <card-info-item wide label='Width Cup Radius' hidden$=[[tablet.isRound]]>[[tablet.formatted.widthCupRadius]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Baffles' icon='app-icons:tooling'>
          <card-info-item wide label='Perimeter'>[[tablet.formatted.perimeter]]</card-info-item>
          <card-info-item wide label='Cross Section Area'>[[tablet.formatted.crossSectionArea]]</card-info-item>
          <card-info-item wide label='Cup Surface Area'>[[tablet.formatted.cupArea]]</card-info-item>
          <card-info-item wide label='Cup Volume'>[[tablet.formatted.cupVolume]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Spray Guns' icon='app-icons:tooling'>
          <card-info-item wide label='Perimeter'>[[tablet.formatted.perimeter]]</card-info-item>
          <card-info-item wide label='Cross Section Area'>[[tablet.formatted.crossSectionArea]]</card-info-item>
          <card-info-item wide label='Cup Surface Area'>[[tablet.formatted.cupArea]]</card-info-item>
          <card-info-item wide label='Cup Volume'>[[tablet.formatted.cupVolume]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-overview-page', PanOverviewPage);