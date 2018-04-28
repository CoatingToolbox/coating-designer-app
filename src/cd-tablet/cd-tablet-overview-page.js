
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux/redux-mixin.js';
import '../cd-card/cd-card-with-toolbar.js';
import '../cd-card/cd-card-button.js';
import '../cd-card/cd-card-info-section.js';
import '../cd-card/cd-card-info-item.js';
import '../cd-header/cd-page-header.js';
import '../cd-header/cd-page-header-button.js';
import './cd-tablet-layout.js';

class CdTabletOverviewPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' }
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
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 124px, #000000 124px,var(--background-color) 0%,var(--background-color) 100%);
        }
        cd-card-info-section + cd-card-info-section {
          border-top: var(--border-line);
        }
        cd-tablet-layout {
          margin: 32px auto 24px;
        }
        .capitalize {
          text-transform: capitalize;
        }
        [hidden] {
          display: none !important;
        }
      </style>
      
      
      <cd-page-header>
        <div slot='title'>Tablet Core Overview</div>
        <p slot='description'>
          Review the current selected tablet and make changes with the tablet designer
          or load a tablet from the library.
        </p>
        <a href='#/tablet/designer/description' slot='button'>
          <cd-page-header-button label='Tablet Designer'></cd-page-header-button>
        </a>
        <a href='#/tablet/library' slot='button'>
          <cd-page-header-button label='Tablet Library'></cd-page-header-button>
        </a>
      </cd-page-header>
      
      <div id='background-wrapper'>
        <cd-card-with-toolbar title='General Information'>
          <a href='#/tablet/designer/description' slot='toolbar'>
           <cd-card-button label='Edit'></cd-card-button>
          </a>
          <cd-card-info-section title='Product Information' icon='cd-icons:product-info'>
            <cd-card-info-item wide label='Name' class='capitalize'>[[tablet.productName]]</cd-card-info-item>
            <cd-card-info-item wide label='Brand' class='capitalize'></cd-card-info-item>
            <cd-card-info-item wide label='Market' class='capitalize'>[[tablet.productType]]</cd-card-info-item>
            <cd-card-info-item wide label='Dosage Form' class='capitalize'>[[tablet.dosageForm]]</cd-card-info-item>
            <cd-card-info-item wide label='Formulation' class='capitalize'>[[tablet.formulationName]]</cd-card-info-item>
          </cd-card-info-section>
          
          <cd-card-info-section title='Company Information' icon='cd-icons:company-info'>
            <cd-card-info-item wide label='Company' class='capitalize'>[[tablet.companyName]]</cd-card-info-item>
            <cd-card-info-item wide label='Location' class='capitalize'>[[tablet.companyLocation]]</cd-card-info-item>
            <cd-card-info-item wide label='Contact' class='capitalize'>[[tablet.contactName]]</cd-card-info-item>
            <cd-card-info-item wide label='Email'>[[tablet.contactEmail]]</cd-card-info-item>
          </cd-card-info-section>
        </cd-card-with-toolbar>
      </div>
      
      
      <cd-card-with-toolbar title='Tablet Information'>
        <a href='#/tablet/designer/dimensions' slot='toolbar'>
         <cd-card-button label='Edit'></cd-card-button>
        </a>
        
        <cd-card-info-section title='Shape & Size' icon='cd-icons:ruler'>
          <cd-card-info-item wide label='Shape' class='capitalize'>[[tablet.shape]]</cd-card-info-item>
          <cd-card-info-item wide label='Length'>[[tablet.formatted.length]]</cd-card-info-item>
          <cd-card-info-item wide label='Width' hidden$=[[tablet.isRound]]>[[tablet.formatted.width]]</cd-card-info-item>
          <cd-card-info-item wide label='Thickness'>[[tablet.formatted.totalThickness]]</cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Weight & Density' icon='cd-icons:weight'>
          <cd-card-info-item wide label='Weight'>[[tablet.formatted.weight]]</cd-card-info-item>
          <cd-card-info-item wide label='Compressed Density'>[[tablet.formatted.compressedDensity]]</cd-card-info-item>
          <cd-card-info-item wide label='Bulk Density'>[[tablet.formatted.bulkDensity]]</cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Surface Area & Volume' icon='cd-icons:surface-area'>
          <cd-card-info-item wide label='Surface Area'>[[tablet.formatted.totalArea]]</cd-card-info-item>
          <cd-card-info-item wide label='Volume'>[[tablet.formatted.totalVolume]]</cd-card-info-item>
          <cd-card-info-item wide label='Area / Volume'>[[tablet.formatted.areaToVolume]]</cd-card-info-item>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Tablet Schematic'>
          <cd-tablet-layout tablet='[[tablet]]'></cd-tablet-layout>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Tooling Information'>
        <cd-card-info-section title='Concavity' icon='cd-icons:concavity'>
          <cd-card-info-item wide label='Concavity' class='capitalize'>[[tablet.concavity]]</cd-card-info-item>
          <cd-card-info-item wide label='Cup Depth'>[[tablet.formatted.cupDepth]]</cd-card-info-item>
          <cd-card-info-item wide label='Length Cup Radius'>[[tablet.formatted.lengthCupRadius]]</cd-card-info-item>
          <cd-card-info-item wide label='Width Cup Radius' hidden$=[[tablet.isRound]]>[[tablet.formatted.widthCupRadius]]</cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Tooling Details' icon='cd-icons:tooling'>
          <cd-card-info-item wide label='Perimeter'>[[tablet.formatted.perimeter]]</cd-card-info-item>
          <cd-card-info-item wide label='Cross Section Area'>[[tablet.formatted.crossSectionArea]]</cd-card-info-item>
          <cd-card-info-item wide label='Cup Surface Area'>[[tablet.formatted.cupArea]]</cd-card-info-item>
          <cd-card-info-item wide label='Cup Volume'>[[tablet.formatted.cupVolume]]</cd-card-info-item>
        </cd-card-info-section>
      </cd-card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-overview-page', CdTabletOverviewPage);