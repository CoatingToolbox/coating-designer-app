
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../cd-elements/cd-card-with-toolbar.js';
import '../cd-elements/cd-card-button.js';
import '../cd-elements/cd-card-info-section.js';
import '../cd-elements/cd-card-info-item.js';
import '../cd-elements/cd-tablet-layout.js';

class CdTabletOverviewPage extends PolymerElement {
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
          width: 100%;
          max-width: 964px;
          margin: auto;
          padding: 48px 0px;
        }
        #page-title {
          font-size: 36px;
          font-weight: lighter;
        }
        cd-card-info-section + cd-card-info-section {
          border-top: var(--border-line);
        }
        
      </style>
      
      <div id='page-title'>Coating Substrate Overview</div>
      
      <cd-card-with-toolbar title='General Information'>
        <cd-card-button slot='toolbar' label='Edit'></cd-card-button>
        <cd-card-info-section title='Product Information' icon=''>
          <cd-card-info-item wide label='Name'>Colorcon Round Placebo</cd-card-info-item>
          <cd-card-info-item wide label='Brand'></cd-card-info-item>
          <cd-card-info-item wide label='Market'>Pharmaceutical</cd-card-info-item>
          <cd-card-info-item wide label='Type'>Tablet</cd-card-info-item>
          <cd-card-info-item wide label='Active'>Placebo</cd-card-info-item>
          <cd-card-info-item wide label='Formulation'>Placebo WP-2</cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Company Information' icon=''>
          <cd-card-info-item wide label='Company'>Colorcon</cd-card-info-item>
          <cd-card-info-item wide label='Location'>Irvine, CA</cd-card-info-item>
          <cd-card-info-item wide label='Contact'>Jason Hansell</cd-card-info-item>
          <cd-card-info-item wide label='Email'>JHansell@Colorcon.com</cd-card-info-item>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      
      <cd-card-with-toolbar title='Tablet Information'>
        <cd-card-button slot='toolbar' label='Edit'></cd-card-button>
        
        <cd-card-info-section title='Shape & Size' icon=''>
          <cd-card-info-item wide label='Shape'>Round</cd-card-info-item>
          <cd-card-info-item wide label='Length'>11.1 mm</cd-card-info-item>
          <cd-card-info-item wide label='Width'></cd-card-info-item>
          <cd-card-info-item wide label='Thickness'>4.2 mm</cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Tablet Schematic' icon=''>
          <cd-tablet-layout wide></cd-tablet-layout>
        </cd-card-info-section>
        
        <cd-card-info-section title='Weight & Density' icon=''>
          <cd-card-info-item wide label='Weight'>325.6 mg</cd-card-info-item>
          <cd-card-info-item wide label='Compressed Density'>1.27 g/ml</cd-card-info-item>
          <cd-card-info-item wide label='Bulk Density'>0.79 g/ml</cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Surface Area & Volume' icon=''>
          <cd-card-info-item wide label='Surface Area'>1.02 cm<sup>2</sup></cd-card-info-item>
          <cd-card-info-item wide label='Volume'>0.15 cm<sup>3</sup></cd-card-info-item>
        </cd-card-info-section>
      </cd-card-with-toolbar>
      
      <cd-card-with-toolbar title='Tooling Information'>
        <cd-card-info-section title='Concavity' icon=''>
          <cd-card-info-item wide label='Concavity'>Standard</cd-card-info-item>
          <cd-card-info-item wide label='Cup Depth'>2.1 mm</cd-card-info-item>
          <cd-card-info-item wide label='Length Cup Radius'></cd-card-info-item>
          <cd-card-info-item wide label='Width Cup Radius'></cd-card-info-item>
        </cd-card-info-section>
        
        <cd-card-info-section title='Tooling Details' icon=''>
          <cd-card-info-item wide label='Perimeter'>11.4 mm</cd-card-info-item>
          <cd-card-info-item wide label='Cross Section Area'>0.45 cm<sup>2</sup></cd-card-info-item>
          <cd-card-info-item wide label='Cup Surface Area'>0.45 cm<sup>2</sup></cd-card-info-item>
          <cd-card-info-item wide label='Cup Volume'>0.45 cm<sup>3</sup></cd-card-info-item>
        </cd-card-info-section>
      </cd-card-with-toolbar>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-overview-page', CdTabletOverviewPage);