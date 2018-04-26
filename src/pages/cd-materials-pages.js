
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/paper-tabs/paper-tabs.js';
import '../../node_modules/@polymer/paper-tabs/paper-tab.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../cd-elements/cd-icons.js';
import './cd-tablet-overview-page.js';

class CdMaterialsPages extends PolymerElement {
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
        }
        
        app-header {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        app-header app-toolbar {
          background-color: var(--app-dark-color);
        }
        app-header #toolbar-title {
          font-size: 24px;
        }
        app-header #toolbar-spacer {
          flex-grow: 1;
        }
        app-header #user-name {
          font-size: 16px;
        }
        app-header a {
          text-decoration: none;
          color: inherit;
        }
        app-header .icon {
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--white-color);
          background-color: var(--app-light-color);
        }
        
        paper-tabs {
          --paper-tabs-selection-bar-color: var(--app-accent-color);
          font-size: 16px;
        }
        paper-tab {
          padding: 0px 16px;
          margin: 0px 8px;
        }
        paper-tabs a {
          text-decoration: none;
          color: inherit;
          height: initial;
          text-align: center;
        }
      </style>
      
      <app-location
        route="{{route}}"
        use-hash-as-path>
      </app-location>
  
      <app-route
        route="{{route}}"
        pattern="/materials/:tab"
        data="{{routeData}}">
      </app-route>
      
      <app-header-layout fullbleed>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <a href='#/home'>
              <paper-icon-button icon='cd-icons:arrow-left'></paper-icon-button>
            </a>
            <div class='toolbar-title'>Materials & Equipment</div>
            <div id='toolbar-spacer'></div>
            <paper-tabs selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
              <paper-tab tab='tablet' link>
                <a href="#/materials/tablet" tabindex="-1">Tablet</a>
              </paper-tab>
              <paper-tab tab='pan' link>
                <a href="#/materials/pan" tabindex="-1">Pan</a>
              </paper-tab>
              <paper-tab tab='coating' link>
                <a href="#/materials/coating" tabindex="-1">Coating</a>
              </paper-tab>
            </paper-tabs>
            
          </app-toolbar>
        </app-header>
      
        <iron-pages selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
          <cd-tablet-overview-page tab='tablet'></cd-tablet-overview-page>
          <div tab='pan'>Library</div>
          <div tab='coating'>Library</div>
        </iron-pages>
      </app-header-layout>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-materials-pages', CdMaterialsPages);