
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
import '../app-icons.js';
import '../tablet/tablet-overview-page.js';
import '../tablet/tablet-designer-page.js';

class TabletPages extends PolymerElement {
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
        pattern="/tablet/:tab"
        data="{{routeData}}">
      </app-route>
      
      <app-header-layout fullbleed>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <a href='#/home'>
              <paper-icon-button icon='app-icons:arrow-left'></paper-icon-button>
            </a>
            <page-title class='toolbar-title'>Tablet Core</page-title>
            <div id='toolbar-spacer'></div>
            <paper-tabs selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
              <paper-tab tab='overview' link>
                <a href="#/tablet/overview" tabindex="-1">Overview</a>
              </paper-tab>
              <paper-tab tab='designer' link>
                <a href="#/tablet/designer" tabindex="-1">Designer</a>
              </paper-tab>
              <paper-tab tab='library' link>
                <a href="#/tablet/library" tabindex="-1">Library</a>
              </paper-tab>
            </paper-tabs>
            
          </app-toolbar>
        </app-header>
      
        <iron-pages selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
          <tablet-overview-page tab='overview'></tablet-overview-page>
          <tablet-designer-page tab='designer'></tablet-designer-page>
          <div tab='library'>Library</div>
        </iron-pages>
      </app-header-layout>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-pages', TabletPages);