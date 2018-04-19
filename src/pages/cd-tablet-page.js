
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/paper-tabs/paper-tabs.js';
import '../../node_modules/@polymer/paper-tabs/paper-tab.js';
import '../cd-elements/cd-card-with-toolbar.js';
import '../cd-elements/cd-card-button.js';

class CdTabletPage extends PolymerElement {
  static get properties () {
    return {
      route: Object,
      routeData: Object
    };
  }
  
  _gotoPage(e) {
    window.location = `#/tablet/${e.detail.value}`;
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          min-height: 100vh;
          padding-bottom: 48px;
        }
        #header {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        #title-layout {
          display: flex;
          align-items: center;
          padding: 16px 24px;
        }
        #header #title-icon {
          height: 48px;
          width: 48px;
          margin-right: 24px;
          background-color: var(--app-light-color);
          border: 2px solid var(--light-gray-color);
          border-radius: 8px;
        }
        #header #header-title {
          font-size: 48px;
          font-weight: lighter;
        }
        paper-tabs {
          --paper-tabs-selection-bar-color: var(--app-accent-color);
          font-size: 18px;
        }
      </style>
      
      <app-location
        route="{{route}}"
        use-hash-as-path>
      </app-location>
  
      <app-route
        route="{{route}}"
        pattern="/tablet/:tab"
        data="{{routeData}}">
      </app-route>
      
      <section id='header'>
        <div id='title-layout'>
          <div id='title-icon'></div>
          <div id='header-title'>Coating Substrate</div>
        </div>
        <paper-tabs selected='[[routeData.tab]]' attr-for-selected='tab' on-selected-changed='_gotoPage'>
          <paper-tab tab='overview'>Overview</paper-tab>
          <paper-tab tab='design'>Design</paper-tab>
          <paper-tab tab='library'>Library</paper-tab>
        </paper-tabs>
      </section>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-tablet-page', CdTabletPage);